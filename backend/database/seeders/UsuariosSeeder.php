<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    public function run(): void
    {
        $roles = DB::table('roles')->pluck('id', 'nombre');
        $password = Hash::make('password');

        DB::table('usuarios')->insert([
            ['rol_id' => $roles['Admin'], 'nombre' => 'Admin Sabitech', 'email' => 'admin@sabitech.test', 'telefono' => '600000001', 'fecha_nacimiento' => '1990-05-12', 'password' => $password],
            ['rol_id' => $roles['Organizador'], 'nombre' => 'Organizador Sabitech', 'email' => 'organizador@sabitech.test', 'telefono' => '600000002', 'fecha_nacimiento' => '1992-09-30', 'password' => $password],
        ]);

        for ($i = 1; $i <= 25; $i++) {
            DB::table('usuarios')->insert([
                'rol_id' => $roles['Asistente'],
                'nombre' => 'Asistente '.$i,
                'email' => 'asistente'.$i.'@sabitech.test',
                'telefono' => '6100000'.str_pad($i, 2, '0', STR_PAD_LEFT),
                'fecha_nacimiento' => now()->subYears(18 + $i)->toDateString(),
                'password' => $password,
            ]);
        }
    }
}
