<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 100; $i++) {
            Quiz::create([
                'title' => "Test №$i",
                'code' => (string) $i,
                'used' => false,
            ]);
        }
    }
}