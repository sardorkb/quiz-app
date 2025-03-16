<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['text', 'options', 'correct_option'];

    protected $casts = [
        'options' => 'array', // Store options as JSON
    ];
}
