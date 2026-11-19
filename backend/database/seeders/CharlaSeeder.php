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

        // [título, descripción, foto_url, días desde hoy, hora, aforo, plazas ocupadas, cancelada]
        $charlas = [
            [
                'Introducción a Laravel',
                'Rutas, controladores y migraciones paso a paso.',
                'https://i.ytimg.com/vi/LkSeELpdj4k/maxresdefault.jpg',
                3, 10, 40, 12, false
            ],
            [
                'Despliegue con Docker',
                'Del código a un contenedor en producción.',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5M_k0e-SDTv6VZds4cUQJ1Zqc5al3PPPnTE1PIIW0vhdikTgXiOJ2ehg&s=10',
                3, 12, 30, 0, false
            ],
            [
                'Accesibilidad en la web',
                'Etiquetas, foco y contraste en interfaces reales.',
                'https://dinahosting.com/blog/upload/2023/09/Accesibilidad-web.jpg',
                4, 10, 25, 8, false
            ],
            [
                'Última plaza disponible',
                'Charla con una única plaza para probar el aforo.',
                'https://www.esdorihuela.com/web/wp-content/uploads/2025/07/Ultimas_plazas_prueba_25-26.jpg',
                5, 11, 1, 0, false
            ],
            [
                'Charla completa',
                'Sin plazas libres: sirve para probar el aforo lleno.',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmUSU3Robq3TD9Pa0QbN05EwCgVELccUj4AWvU2bCPdIMHmaABdgFuA4g&s=10',
                5, 16, 20, 20, false
            ],
            [
                'Charla cancelada',
                'Cancelada por el organizador.',
                'https://definicion.de/wp-content/uploads/2011/09/charla-1.jpg',
                6, 10, 30, 0, true
            ],
            [
                'Charla ya celebrada',
                'Ocurrió hace unos días.',
                'https://cevents.es/wp-content/uploads/2022/05/ficha-tablet-charlas.jpg',
                -4, 10, 30, 22, false
            ],
        ];

        foreach ($charlas as $i => [$titulo, $descripcion, $fotoUrl, $dias, $hora, $aforo, $ocupadas, $cancelada]) {

    $inicio = now()->addDays($dias)->setTime($hora, 0);

    DB::table('charlas')->updateOrInsert(
        ['titulo' => $titulo],
        [
            'ponente_id' => $ponentes[$i % count($ponentes)],
            'ubicacion_id' => $ubicaciones[$i % count($ubicaciones)],
            'descripcion' => $descripcion,
            'foto_url' => $fotoUrl,
            'inicio' => $inicio,
            'fin' => $inicio->copy()->addHour(),
            'aforo' => $aforo,
            'plazas_ocupadas' => $ocupadas,
            'cancelada' => $cancelada,
            'updated_at' => now(),
        ]
    );
}
    }
}
