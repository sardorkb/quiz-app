<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if the user already exists to avoid duplicates
        $user = User::where('email', 'admin@millioner.uz')->first();

        if (!$user) {
            User::create([
                'name' => 'Default User', // You can customize the name
                'email' => 'admin@millioner.uz',
                'password' => Hash::make('12345678'), // Hashed password
            ]);
        }

        $this->command->info('User seeded successfully!');
    }
}
