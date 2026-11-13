<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsuarioController extends Controller
{
    // 1. Listar todos los usuarios (nunca se devuelve la contraseña)
    public function getUsuarios()
    {
        $usuarios = DB::table('usuarios')
            ->join('roles', 'usuarios.rol_id', '=', 'roles.id')
            ->select(
                'usuarios.id',
                'usuarios.nombre',
                'usuarios.email',
                'usuarios.telefono',
                'usuarios.fecha_nacimiento',
                'roles.nombre as rol'
            )
            ->orderBy('usuarios.id', 'asc')
            ->get();

        return response()->json($usuarios);
    }

    // 2. Crear un usuario (registro)
    public function crearUsuario(Request $request)
    {
        // 1. Validar los datos recibidos
        $datos = $request->validate([
            'nombre' => 'required|string|max:100',
            'email' => 'required|email|max:150|unique:usuarios,email',
            'telefono' => 'required|string|max:15',
            'fecha_nacimiento' => 'required|date|before:today',
            'password' => 'required|string|min:8'
        ]);

        // 2. Buscar el rol "asistente" (el que se asigna al registrarse)
        $rolId = DB::table('roles')
            ->where('nombre', 'asistente')
            ->value('id');

        if (!$rolId) {
            return response()->json([
                'mensaje' => 'El rol asistente no existe'
            ], 500);
        }

        // 3. Preparar los datos: contraseña cifrada y rol asignado por el servidor
        $datos['password'] = Hash::make($datos['password']);
        $datos['rol_id'] = $rolId;

        // 4. Insertar el usuario
        $id = DB::table('usuarios')
            ->insertGetId($datos);

        // 5. Recuperar el usuario creado (sin la contraseña)
        $usuario = DB::table('usuarios')
            ->where('id', $id)
            ->select('id', 'nombre', 'email', 'telefono', 'fecha_nacimiento', 'rol_id')
            ->first();

        // 6. Devolver la respuesta
        return response()->json([
            'mensaje' => 'Usuario creado correctamente',
            'usuario' => $usuario
        ], 201);
    }

    // 3. Login
    public function login(Request $request)
    {
        // 1. Validar los datos recibidos
        $datos = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // 2. Buscar el usuario por su email
        $usuario = DB::table('usuarios')
            ->where('email', $datos['email'])
            ->first();

        // 3. Comprobar la contraseña (mismo mensaje si falla el email o la contraseña)
        if (!$usuario || !Hash::check($datos['password'], $usuario->password)) {
            return response()->json([
                'mensaje' => 'Email o contraseña incorrectos'
            ], 401);
        }

        // 4. Obtener el nombre del rol
        $rol = DB::table('roles')
            ->where('id', $usuario->rol_id)
            ->value('nombre');

        // 5. Generar un token y guardarlo cifrado en la base de datos
        $token = Str::random(60);

        DB::table('usuarios')
            ->where('id', $usuario->id)
            ->update(['api_token' => hash('sha256', $token)]);

        // 6. Devolver el token (en claro, solo esta vez) y los datos del usuario
        return response()->json([
            'mensaje' => 'Login correcto',
            'token' => $token,
            'usuario' => [
                'id' => $usuario->id,
                'nombre' => $usuario->nombre,
                'email' => $usuario->email,
                'rol' => $rol
            ]
        ], 200);
    }

    // 4. Logout (borra el token)
    public function logout(Request $request)
    {
        $usuario = $request->attributes->get('usuario');

        DB::table('usuarios')
            ->where('id', $usuario->id)
            ->update(['api_token' => null]);

        return response()->json([
            'mensaje' => 'Sesión cerrada correctamente'
        ], 200);
    }
}