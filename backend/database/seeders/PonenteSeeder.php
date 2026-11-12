<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PonenteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ponentes')->insert([
            ['nombre' => 'Ana Pérez', 'biografia' => 'Desarrolladora backend con diez años de experiencia.', 'especialidad' => 'Laravel y APIs'],
            ['nombre' => 'Luis Gómez', 'biografia' => 'Ingeniero de sistemas y entusiasta de la nube.', 'especialidad' => 'Despliegue y Docker'],
            ['nombre' => 'Marta Ruiz', 'biografia' => 'Diseñadora de interfaces y especialista en accesibilidad.', 'especialidad' => 'Diseño y accesibilidad'],
        ]);
    }
}