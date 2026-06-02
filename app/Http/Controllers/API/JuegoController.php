<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Juego;
use Illuminate\Http\Request;

class JuegoController extends Controller
{

    public function index()
    {
        $juegos = Juego::all();
        return response()->json($juegos, 200);
    }

    public function show($id)
    {
        $juego = Juego::find($id);

        if (!$juego) {
            return response()->json(['message' => 'El juego no existe en la ludoteca'], 404);
        }

        return response()->json($juego, 200);
    }
}
