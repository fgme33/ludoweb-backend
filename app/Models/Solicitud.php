<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;

    protected $table = 'solicitudes';

    protected $fillable = [
        'codigo',
        'nombre_cliente',
        'numero_jugadores',
        'juegos_solicitados',
        'necesita_apoyo',
        'estado'
    ];
}
