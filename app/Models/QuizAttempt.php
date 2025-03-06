<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    protected $fillable = ['quiz_id', 'name', 'address', 'phone', 'score', 'completed_at'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}