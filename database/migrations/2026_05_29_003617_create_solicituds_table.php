<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('solicitudes', function (Blueprint $table) {
        $table->id();
        $table->string('codigo')->unique(); 
        $table->string('nombre_cliente');   
        $table->integer('numero_jugadores');
        $table->boolean('necesita_apoyo')->default(false); 
        $table->text('juegos_solicitados'); 
        $table->string('estado')->default('Pendiente'); 
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicituds');
    }
};
