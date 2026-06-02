<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Juego;

class JuegoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Juego::create(['titulo' => 'Catan', 'descripcion' => 'Estrategia y negociación.', 'dificultad' => 'Media', 'edad' => '10+', 'jugadores' => '3-4', 'clase' => 'Estrategia', 'disponible' => true]);
	Juego::create(['titulo' => 'Dixit', 'descripcion' => 'Deducción e imaginación.', 'dificultad' => 'Baja', 'edad' => '8+', 'jugadores' => '3-6', 'clase' => 'Familiar', 'disponible' => true]);
	Juego::create(['titulo' => 'Carcassonne', 'descripcion' => 'Construcción de mapas.', 'dificultad' => 'Media', 'edad' => '7+', 'jugadores' => '2-5', 'clase' => 'Estrategia', 'disponible' => true]);
	Juego::create(['titulo' => 'Monopoly', 'descripcion' => 'Negociación clásica.', 'dificultad' => 'Baja', 'edad' => '8+', 'jugadores' => '2-8', 'clase' => 'Clásico', 'disponible' => false]);
    }
}
