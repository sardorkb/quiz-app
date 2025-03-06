<?php
namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    // Public: Show quiz code entry
    public function start(Request $request)
    {
        if ($request->isMethod('post')) {
            $request->validate(['code' => 'required|string|exists:quizzes,code']);
            $quiz = Quiz::where('code', $request->code)->first();

            if ($quiz->used) {
                return back()->withErrors(['code' => 'Bu kod allaqachon ishlatilgan.']);
            }

            return Inertia::render('quizzes/details', ['quiz' => $quiz]);
        }
        return Inertia::render('quizzes/start');
    }

    // Public: Start quiz after details submission
    public function attempt(Request $request)
    {
        $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
        ]);

        $quiz = Quiz::find($request->quiz_id);
        if ($quiz->used) {
            return back()->withErrors(['quiz_id' => 'Bu kod allaqachon ishlatilgan.']);
        }

        $attempt = QuizAttempt::create($request->only('quiz_id', 'name', 'address', 'phone'));
        $quiz->update(['used' => true]);

        // Fix: Select 20 random questions from the global question pool
        $questions = Question::inRandomOrder()->limit(20)->get();

        return Inertia::render('quizzes/attempt', [
            'attempt' => $attempt,
            'questions' => $questions,
        ]);
    }

    // Public: Submit quiz answers
    public function submit(Request $request, QuizAttempt $attempt)
    {
        $request->validate([
            'answers' => 'required|array|size:20',
            'answers.*' => 'integer|between:0,3',
        ]);

        // Fix: Retrieve answers from global question pool
        $questions = Question::whereIn('id', array_keys($request->answers))
            ->pluck('correct_option', 'id')
            ->toArray();

        $score = 0;
        foreach ($request->answers as $questionId => $answer) {
            if (isset($questions[$questionId]) && $questions[$questionId] === $answer) {
                $score++;
            }
        }

        $attempt->update([
            'score' => $score,
            'completed_at' => now(),
        ]);

        return redirect()->route('quizzes.result', $attempt);
    }

    // Public: Show quiz result
    public function result(QuizAttempt $attempt): Response
    {
        return Inertia::render('quizzes/result', [
            'attempt' => $attempt,
            'prize' => $attempt->score * 10000, // 10,000 so'm per correct answer
        ]);
    }

    // Admin: Manage quizzes
    public function index(): Response
    {
        return Inertia::render('quizzes/index', [
            'quizzes' => Quiz::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('quizzes/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string|unique:quizzes|max:10',
        ]);

        Quiz::create($request->all());

        return redirect()->route('quizzes.index')->with('success', 'Test muvaffaqiyatli yaratildi.');
    }

    public function edit(Quiz $quiz): Response
    {
        return Inertia::render('quizzes/edit', [
            'quiz' => $quiz,
        ]);
    }

    public function update(Request $request, Quiz $quiz)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:quizzes,code,' . $quiz->id,
        ]);

        $quiz->update($request->all());

        return redirect()->route('quizzes.index')->with('success', 'Test muvaffaqiyatli yangilandi.');
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return redirect()->route('quizzes.index')->with('success', 'Test o\'chirildi.');
    }
}
