<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuizAttempt extends Model
{
    protected $fillable = [
        'quiz_id',
        'name',
        'address',
        'phone',
        'birthday',
        'score',
        'time_taken',
        'completed_at',
    ];

    protected $casts = [
        'birthday' => 'date',
        'completed_at' => 'datetime',
        'score' => 'integer',
        'time_taken' => 'integer',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function answers()
    {
        return $this->hasMany(QuizAttemptAnswer::class, 'quiz_attempt_id');
    }
}