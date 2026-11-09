<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CharlaController extends Controller
{
    /**
     * GET /api/charlas
     * Devuelve las charlas almacenadas en MySQL.
     */
    public function index(): JsonResponse
    {
        $charlas = DB::table('charla')
            ->select(
                'id',
                'titulo',
                'descripcion',
                'ponente',
                'ubicacion',
                'fecha_inicio',
                'fecha_fin',
                'aforo',
                'estado'
            )
            ->orderBy('id')
            ->get();

        return response()->json($charlas, 200);
    }
}