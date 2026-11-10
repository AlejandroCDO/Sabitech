<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CharlaSeeder extends Seeder
{
    public function run(): void
    {
        $ponentes = DB::table('ponentes')->pluck('id')->all();
        $ubicaciones = DB::table('ubicaciones')->pluck('id')->all();

        // [título, descripción, días desde hoy, hora, aforo, plazas ocupadas, cancelada]
        $charlas = [
            ['Introducción a Laravel', 'Rutas, controladores y migraciones paso a paso.', 3, 10, 40, 12, false],
            ['Despliegue con Docker', 'Del código a un contenedor en producción.', 3, 12, 30, 0, false],
            ['Accesibilidad en la web', 'Etiquetas, foco y contraste en interfaces reales.', 4, 10, 25, 8, false],
            ['Última plaza disponible', 'Charla con una única plaza para probar el aforo.', 5, 11, 1, 0, false],
            ['Charla completa', 'Sin plazas libres: sirve para probar el aforo lleno.', 5, 16, 20, 20, false],
            ['Charla cancelada', 'Cancelada por el organizador.', 6, 10, 30, 0, true],
            ['Charla ya celebrada', 'Ocurrió hace unos días.', -4, 10, 30, 22, false],
        ];

        foreach ($charlas as $i => [$titulo, $descripcion, $dias, $hora, $aforo, $ocupadas, $cancelada]) {
            $inicio = now()->addDays($dias)->setTime($hora, 0);

            DB::table('charlas')->insert([
                'ponente_id' => $ponentes[$i % count($ponentes)],
                'ubicacion_id' => $ubicaciones[$i % count($ubicaciones)],
                'titulo' => $titulo,
                'descripcion' => $descripcion,
                'inicio' => $inicio,
                'fin' => $inicio->copy()->addHour(),
                'aforo' => $aforo,
                'plazas_ocupadas' => $ocupadas,
                'cancelada' => $cancelada,
            ]);
        }
    }
}