<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CharlaController extends Controller
{
    // 1. Listar todas las charlas
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


    // 2. Crear una charla
    public function crearCharla(Request $request)
    {
        // 1. Validar los datos recibidos
        $datos = $request->validate([
            'ponente_id' => 'required|integer',
            'ubicacion_id' => 'required|integer',
            'titulo' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'foto_url' => 'required|url|max:2048',
            'inicio' => 'required|date',
            'fin' => 'required|date|after:inicio',
            'aforo' => 'required|integer|min:1'
        ]);

        // 2. Comprobar que existe el ponente
        $ponente = DB::table('ponentes')
            ->where('id', $datos['ponente_id'])
            ->exists();

        if (!$ponente) {
            return response()->json([
                'mensaje' => 'El ponente no existe'
            ], 404);
        }

        // 3. Comprobar que existe la ubicación
        $ubicacion = DB::table('ubicaciones')
            ->where('id', $datos['ubicacion_id'])
            ->exists();

        if (!$ubicacion) {
            return response()->json([
                'mensaje' => 'La ubicación no existe'
            ], 404);
        }

        // 4. Preparar los datos para la BBDD
        $datos['plazas_ocupadas'] = 0;
        $datos['cancelada'] = false;

        // 5. Insertar la charla
        $id = DB::table('charlas')
            ->insertGetId($datos);

        // 6. Recuperar la charla creada
        $charla = DB::table('charlas')
            ->where('id', $id)
            ->first();

        if (!$charla) {
            return response()->json([
                'mensaje' => 'La charla no se ha podido crear'
            ], 500);
        }

        // 7. Devolver la respuesta
        return response()->json([
            'mensaje' => 'Charla creada correctamente',
            'charla' => $charla
        ], 201);
    }
}
