<?php

use App\Http\Controllers\API\JuegoController;
use App\Http\Controllers\API\SolicitudController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/juegos', [JuegoController::class, 'index']);
Route::get('/juegos/{id}', [JuegoController::class, 'show']);

Route::get('/solicitudes', [SolicitudController::class, 'index']);
Route::post('/solicitudes', [SolicitudController::class, 'store']);
Route::put('/solicitudes/{id}/estado', [SolicitudController::class, 'updateEstado']);
Route::post('/juegos', [App\Http\Controllers\API\JuegoController::class, 'store']);
Route::delete('/juegos/{id}', [App\Http\Controllers\API\JuegoController::class, 'destroy']);
