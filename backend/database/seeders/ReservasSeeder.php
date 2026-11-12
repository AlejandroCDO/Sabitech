<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReservasSeeder extends Seeder
{
    public function run(): void
    {
        $asistentes = DB::table('usuarios')
            ->join('roles', 'roles.id', '=', 'usuarios.rol_id')
            ->where('roles.nombre', 'Asistente')
            ->orderBy('usuarios.id')
            ->pluck('usuarios.id')
            ->all();

        $charlas = DB::table('charlas')->get();

        foreach ($charlas as $charla) {
            if ($charla->plazas_ocupadas > count($asistentes)) {
                throw new \RuntimeException("La charla '{$charla->titulo}' tiene más plazas ocupadas que asistentes en UsuariosSeeder.");
            }

            $yaCelebrada = Carbon::parse($charla->inicio)->isPast();

            // Una reserva activa por cada plaza ocupada, para que cuadre con CharlaSeeder
            foreach (array_slice($asistentes, 0, $charla->plazas_ocupadas) as $i => $usuarioId) {
                $estado = (! $yaCelebrada && $i % 4 == 0) ? 'pendiente' : 'confirmada';

                DB::table('reservas')->insert([
                    'usuario_id' => $usuarioId,
                    'charla_id' => $charla->id,
                    'estado' => $estado,
                    'qr_secret' => Str::random(64),
                    'email_intentos' => $estado == 'confirmada' ? 1 : 0,
                    'email_ultimo_envio' => $estado == 'confirmada' ? now() : null,
                ]);
            }

            $siguiente = $asistentes[$charla->plazas_ocupadas] ?? null;

            if ($siguiente && ! $yaCelebrada && ! $charla->cancelada) {
                DB::table('reservas')->insert([
                    'usuario_id' => $siguiente,
                    'charla_id' => $charla->id,
                    'estado' => 'cancelada',
                    'qr_secret' => Str::random(64),
                ]);
            }
        }
    }
}
