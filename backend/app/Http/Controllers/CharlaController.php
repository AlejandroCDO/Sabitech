<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CharlaController extends Controller
{
    public function index()
    {
        $charlas = DB::table('charlas')
            ->join('ponentes', 'charlas.ponente_id', '=', 'ponentes.id')
            ->join('ubicaciones', 'charlas.ubicacion_id', '=', 'ubicaciones.id')
            ->select(
                'charlas.id',
                'charlas.titulo',
                'charlas.descripcion',
                'charlas.foto_url',
                'charlas.inicio',
                'charlas.fin',
                'charlas.aforo',
                'charlas.plazas_ocupadas',
                'charlas.cancelada',

                'ponentes.id as ponente_id',
                'ponentes.nombre as ponente_nombre',
                'ponentes.biografia as ponente_biografia',
                'ponentes.foto_url as ponente_foto',
                'ponentes.especialidad as ponente_especialidad',
                'ponentes.linkedin_url as ponente_linkedin',

                'ubicaciones.id as ubicacion_id',
                'ubicaciones.nombre as ubicacion_nombre',
                'ubicaciones.provincia',
                'ubicaciones.municipio',
                'ubicaciones.calle',
                'ubicaciones.codigo_postal',
                'ubicaciones.numero',
                'ubicaciones.puerta'
            )
            ->orderBy('charlas.inicio', 'asc')
            ->get();

        return response()->json($charlas);
    }
}