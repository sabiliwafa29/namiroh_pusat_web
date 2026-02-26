<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name'       => 'Super Admin',
                'email'      => 'admin@namiroh.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Manajer Operasional',
                'email'      => 'manajer@namiroh.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'manajer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Staff CS 1',
                'email'      => 'cs1@namiroh.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'staff',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Staff CS 2',
                'email'      => 'cs2@namiroh.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'staff',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->command->info('✅ UserSeeder: 4 user ditambahkan.');
        $this->command->line('   📧 admin@namiroh.com     | namiroh202611 | admin');
        $this->command->line('   📧 manajer@namiroh.com  | namiroh202611 | manajer');
        $this->command->line('   📧 cs1@namiroh.com      | namiroh202611 | staff');
    }
}
