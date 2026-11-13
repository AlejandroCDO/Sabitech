<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CharlaController;
use App\Http\Controllers\UsuarioController;

// Rutas públicas (no necesitan token)
Route::get('/charlas', [CharlaController::class, 'index']);
Route::post('/register', [UsuarioController::class, 'crearUsuario']);
Route::post('/login', [UsuarioController::class, 'login']);

// Rutas que necesitan token
Route::middleware('token')->group(function () {
    Route::get('/usuarios', [UsuarioController::class, 'getUsuarios']);
    Route::post('/logout', [UsuarioController::class, 'logout']);
});

// Crear charlas (solo admin). Descomentar cuando el frontend envíe el token:
// Route::post('/charlas', [CharlaController::class, 'crearCharla'])->middleware('token:admin');