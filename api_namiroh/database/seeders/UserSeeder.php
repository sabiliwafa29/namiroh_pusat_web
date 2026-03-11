<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insertOrIgnore([
            [
                'name'       => 'Super Admin',
                'email'      => 'admin@annamirohtravelindo.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Manajer Operasional',
                'email'      => 'manajer@annamirohtravelindo.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'manajer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Staff CS 1',
                'email'      => 'cs1@annamirohtravelindo.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'staff',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Staff CS 2',
                'email'      => 'cs2@annamirohtravelindo.com',
                'password'   => Hash::make('namiroh202611'),
                'role'       => 'staff',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->command->info('✅ UserSeeder: 4 user ditambahkan.');
        $this->command->line('   📧 admin@annamirohtravelindo.com     | namiroh202611 | admin');
        $this->command->line('   📧 manajer@annamirohtravelindo.com  | namiroh202611 | manajer');
        $this->command->line('   📧 cs1@namiroh.com      | namiroh202611 | staff');
    }
}
