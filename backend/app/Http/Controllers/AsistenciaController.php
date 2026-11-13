<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class AsistenciaController extends Controller
{
    public function index()
    {
        $asistencias = DB::table('asistencias')
            ->join('reservas', 'reservas.id', '=', 'asistencias.reserva_id')
            ->join('usuarios', 'usuarios.id', '=', 'reservas.usuario_id')
            ->join('charlas', 'charlas.id', '=', 'reservas.charla_id')
            ->select(
                'asistencias.id',
                'asistencias.reserva_id',
                'reservas.charla_id',
                'charlas.titulo as charla_titulo',
                'reservas.usuario_id',
                'usuarios.nombre as usuario_nombre',
                'asistencias.validada_en'
            )
            ->orderBy('charlas.id', 'asc')
            ->orderBy('asistencias.id', 'asc')
            ->get();

        return response()->json($asistencias);
    }
}
