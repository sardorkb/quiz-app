<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;

// Public quiz routes
Route::get('/', [QuizController::class, 'start'])->name('home');
Route::post('/', [QuizController::class, 'start'])->name('quizzes.start');
Route::post('/quizzes/attempt', [QuizController::class, 'attempt'])->name('quizzes.attempt');
Route::post('/quizzes/{attempt}/submit', [QuizController::class, 'submit'])->name('quizzes.submit');
Route::get('/quizzes/result/{attempt}', [QuizController::class, 'result'])->name('quizzes.result');
Route::post('/quizzes/{attempt}/next', [QuizController::class, 'next'])->name('quizzes.next');

Route::get('/check-result', [QuizController::class, 'showCheckResultForm'])->name('quizzes.check-result-form');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', UserController::class)->except(['show']);
    Route::resource('quizzes', QuizController::class)->except(['start', 'attempt', 'submit', 'result']);
    Route::get('/attempts', [QuizController::class, 'attempts'])->name('quizzes.attempts');
    Route::get('/results', [QuizController::class, 'results'])->name('quizzes.results'); 
    Route::get('/results/{attempt}', [QuizController::class, 'resultDetail'])->name('quizzes.result.detail');
    // Global question pool (fix: removed nested quizzes.questions)
    Route::resource('questions', QuestionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
