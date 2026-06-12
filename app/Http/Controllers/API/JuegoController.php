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

    public function store(\Illuminate\Http\Request $request)
    {
	$camposValidados = $request->validate([
        'titulo' => 'required|string|max:255',
        'descripcion' => 'required|string',
        'dificultad' => 'required|string',
        'edad' => 'required|string',
        'jugadores' => 'required|string',
        'clase' => 'required|string',
        'imagen' => 'nullable|string',
        'disponible' => 'required|boolean'
	]);

	$nuevoJuego = \App\Models\Juego::create($camposValidados);

	return response()->json([
        'success' => true,
        'message' => 'Juego creado exitosamente',
        'data' => $nuevoJuego
	], 201);
    }

    public function destroy($id)
    {
	$juego = \App\Models\Juego::find($id);
	
	if (!$juego) {
        	return response()->json([
            	'success' => false,
            	'message' => 'El juego no existe.'
        	], 404);
    	}

    	$juego->delete();

    	return response()->json([
        	'success' => true,
	        'message' => 'Juego eliminado correctamente del catálogo.'
   	], 200);
   }

}
