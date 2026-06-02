<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Juego extends Model
{
	protected $fillable = ['titulo', 'descripcion', 'dificultad', 'edad', 'jugadores', 'clase', 'disponible'];
}
