<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReservaController extends Controller
{
    // 1. Crear una reserva
    public function crearReserva(Request $request)
    {
        // 1. Validar los datos recibidos
        $datos = $request->validate([
            'charla_id' => 'required|integer'
        ]);

        // 2. El usuario sale del token, no de la petición
        $usuario = $request->attributes->get('usuario');

        return DB::transaction(function () use ($datos, $usuario) {

            // 3. Bloquear la charla para que no se reserven dos veces la misma plaza
            $charla = DB::table('charlas')
                ->where('id', $datos['charla_id'])
                ->lockForUpdate()
                ->first();

            if (!$charla) {
                return response()->json([
                    'mensaje' => 'La charla no existe'
                ], 404);
            }

            if ($charla->cancelada) {
                return response()->json([
                    'mensaje' => 'La charla está cancelada'
                ], 409);
            }

            if (now()->greaterThanOrEqualTo($charla->inicio)) {
                return response()->json([
                    'mensaje' => 'La charla ya ha empezado'
                ], 409);
            }

            if ($charla->plazas_ocupadas >= $charla->aforo) {
                return response()->json([
                    'mensaje' => 'No quedan plazas libres'
                ], 409);
            }

            // 4. Comprobar que el usuario no tiene ya una reserva activa
            $yaReservada = DB::table('reservas')
                ->where('usuario_id', $usuario->id)
                ->where('charla_id', $charla->id)
                ->whereIn('estado', ['pendiente', 'confirmada'])
                ->exists();

            if ($yaReservada) {
                return response()->json([
                    'mensaje' => 'Ya tienes una reserva para esta charla'
                ], 409);
            }

            // 5. Insertar la reserva y ocupar la plaza
            $id = DB::table('reservas')
                ->insertGetId([
                    'usuario_id' => $usuario->id,
                    'charla_id' => $charla->id,
                    'estado' => 'pendiente',
                    'qr_secret' => Str::random(64)
                ]);

            DB::table('charlas')
                ->where('id', $charla->id)
                ->increment('plazas_ocupadas');

            // 6. Recuperar la reserva creada (sin el qr_secret)
            $reserva = DB::table('reservas')
                ->where('id', $id)
                ->select('id', 'usuario_id', 'charla_id', 'estado', 'created_at')
                ->first();

            // 7. Devolver la respuesta
            return response()->json([
                'mensaje' => 'Reserva creada correctamente',
                'reserva' => $reserva
            ], 201);
        });
    }

    // 2. Cancelar una reserva
    public function cancelarReserva(Request $request, $id)
    {
        $usuario = $request->attributes->get('usuario');

        // 1. Buscar la reserva (solo las del propio usuario)
        $charlaId = DB::table('reservas')
            ->where('id', $id)
            ->where('usuario_id', $usuario->id)
            ->value('charla_id');

        if (!$charlaId) {
            return response()->json([
                'mensaje' => 'La reserva no existe'
            ], 404);
        }

        return DB::transaction(function () use ($id, $charlaId) {

            // 2. Bloquear primero la charla y luego la reserva, igual que al crear
            $charla = DB::table('charlas')
                ->where('id', $charlaId)
                ->lockForUpdate()
                ->first();

            $reserva = DB::table('reservas')
                ->where('id', $id)
                ->lockForUpdate()
                ->first();

            if ($reserva->estado == 'cancelada') {
                return response()->json([
                    'mensaje' => 'La reserva ya está cancelada'
                ], 409);
            }

            // 3. No se puede cancelar si la charla ya ha empezado
            if (now()->greaterThanOrEqualTo($charla->inicio)) {
                return response()->json([
                    'mensaje' => 'La charla ya ha empezado'
                ], 409);
            }

            // 4. Cancelar la reserva y liberar la plaza
            DB::table('reservas')
                ->where('id', $reserva->id)
                ->update(['estado' => 'cancelada']);

            DB::table('charlas')
                ->where('id', $charla->id)
                ->where('plazas_ocupadas', '>', 0)
                ->decrement('plazas_ocupadas');

            // 5. Devolver la respuesta
            return response()->json([
                'mensaje' => 'Reserva cancelada correctamente'
            ], 200);
        });
    }
}
