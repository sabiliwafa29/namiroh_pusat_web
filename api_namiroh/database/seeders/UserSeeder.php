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
                'password'   => Hash::make('Annamiroh777'),
                'role'       => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->command->info('✅ UserSeeder: 1 user ditambahkan.');
        $this->command->line('   📧 admin@annamirohtravelindo.com     | Annamiroh777 | admin');
    }
}
