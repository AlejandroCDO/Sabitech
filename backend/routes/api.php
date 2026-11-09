<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CharlaController;


Route::get('/charlas', [CharlaController::class, 'index']);