<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ComprobarToken
{
    public function handle(Request $request, Closure $next, ?string $rol = null): Response
    {
        // 1. Leer el token de la cabecera Authorization: Bearer ...
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'mensaje' => 'Token no enviado'
            ], 401);
        }

        // 2. Buscar el usuario cuyo token (guardado cifrado) coincide
        $usuario = DB::table('usuarios')
            ->join('roles', 'usuarios.rol_id', '=', 'roles.id')
            ->where('usuarios.api_token', hash('sha256', $token))
            ->select('usuarios.id', 'usuarios.nombre', 'usuarios.email', 'roles.nombre as rol')
            ->first();

        if (!$usuario) {
            return response()->json([
                'mensaje' => 'Token no válido'
            ], 401);
        }

        // 3. Si la ruta exige un rol concreto, comprobarlo
        if ($rol && $usuario->rol !== $rol) {
            return response()->json([
                'mensaje' => 'No tienes permiso para esta acción'
            ], 403);
        }

        // 4. Dejar el usuario disponible para el controlador
        $request->attributes->set('usuario', $usuario);

        return $next($request);
    }
}