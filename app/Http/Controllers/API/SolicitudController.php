<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Solicitud;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    
    public function index()
    {
        
        $solicitudes = Solicitud::orderBy('created_at', 'desc')->get();
        return response()->json($solicitudes, 200);
    }

    
    public function store(Request $request)
    {
        
        $request->validate([
            'nombre_cliente'     => 'required|string|max:255',
            'numero_jugadores'   => 'required|integer|min:1',
            'juegos_solicitados' => 'required|string', 
            'necesita_apoyo'     => 'required|boolean' 
        ]);

        do {
            $codigoGenerado = 'REQ-' . rand(1000, 9999);
        } while (Solicitud::where('codigo', $codigoGenerado)->exists()); 

        $solicitud = Solicitud::create([
            'codigo'             => $codigoGenerado,
            'nombre_cliente'     => $request->nombre_cliente,
            'numero_jugadores'   => $request->numero_jugadores,
            'juegos_solicitados' => $request->juegos_solicitados,
            'necesita_apoyo'     => $request->necesita_apoyo,
            'estado'             => 'Pendiente' // Estado inicial por defecto
        ]);

        return response()->json([
            'message' => '¡Solicitud procesada con éxito!',
            'data'    => $solicitud
        ], 201);
    }

    public function updateEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|string|in:Pendiente,Entregado,Devuelto'
        ]);

        $solicitud = Solicitud::find($id);

        if (!$solicitud) {
            return response()->json(['message' => 'La solicitud no existe'], 404);
        }

        $solicitud->estado = $request->estado;
        $solicitud->save();

        return response()->json([
            'message' => 'El estado de la solicitud ha sido actualizado',
            'data'    => $solicitud
        ], 200);
    }
}
