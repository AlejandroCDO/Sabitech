<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UbicacionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ubicaciones')->insert([
            ['provincia' => 'Valencia', 'municipio' => 'Valencia', 'calle' => 'Calle Colón', 'codigo_postal' => '46004', 'numero' => '12', 'puerta' => null, 'nombre' => 'Salón de actos'],
            ['provincia' => 'Valencia', 'municipio' => 'Paterna', 'calle' => 'Avenida de la Innovación', 'codigo_postal' => '46980', 'numero' => '3', 'puerta' => '2B', 'nombre' => 'Aula Magna'],
        ]);
    }
}