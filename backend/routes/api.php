<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CharlaController;


Route::get('/charlas', [CharlaController::class, 'index']);