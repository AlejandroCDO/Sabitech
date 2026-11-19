<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AsistenciasSeeder extends Seeder
{
    public function run(): void
    {
        $validadorId = DB::table('usuarios')
            ->join('roles', 'roles.id', '=', 'usuarios.rol_id')
            ->where('roles.nombre', 'Organizador')
            ->value('usuarios.id');

        if (! $validadorId) {
            $this->command?->warn('No hay ningún organizador, no se crean asistencias.');
            return;
        }

        $reservas = DB::table('reservas')
            ->join('charlas', 'charlas.id', '=', 'reservas.charla_id')
            ->where('reservas.estado', 'confirmada')
            ->where('charlas.cancelada', false)
            ->where('charlas.inicio', '<', now())
            ->select('reservas.id', 'charlas.inicio')
            ->get();

        foreach ($reservas as $reserva) {
            DB::table('asistencias')->insert([
                'reserva_id' => $reserva->id,
                'validado_por' => $validadorId,
                'qr_token' => Str::random(64),
                'validada_en' => Carbon::parse($reserva->inicio)->subMinutes(rand(0, 15)),
            ]);
        }
    }
}
