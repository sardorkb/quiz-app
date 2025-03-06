<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\QuizAttemptAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
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
        return Inertia::render('quizzes/welcome');
    }

    public function attempt(Request $request)
    {
        $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'birthday' => 'required|date|before:today',
        ]);
    
        $quiz = Quiz::find($request->quiz_id);
        if ($quiz->used) {
            return back()->withErrors(['quiz_id' => 'Bu kod allaqachon ishlatilgan.']);
        }
    
        $attempt = QuizAttempt::create($request->only('quiz_id', 'name', 'address', 'phone', 'birthday'));
        $quiz->update(['used' => true]);
    
        $questions = Question::inRandomOrder()->limit(20)->get();
    
        $request->session()->put('quiz_start_time', now()->timestamp);
        $request->session()->put('quiz_questions_' . $attempt->id, $questions->pluck('id')->toArray());
    
        return Inertia::render('quizzes/quizpage', [
            'attempt' => $attempt,
            'questions' => $questions,
            'currentQuestionIndex' => 0,
            'answers' => [],
        ]);
    }
    
    public function next(Request $request, QuizAttempt $attempt)
    {
        $index = $request->input('index', 0);
        $answer = $request->input('answers.' . $request->input('question_id')); // Get the selected answer for the current question
    
        $sessionKey = 'quiz_answers_' . $attempt->id;
        $answers = $request->session()->get($sessionKey, []);
        if ($answer !== null) {
            $answers[$request->input('question_id')] = $answer;
        }
        $request->session()->put($sessionKey, $answers);
    
        if ($index < 20) {
            return Inertia::render('quizzes/quizpage', [
                'attempt' => $attempt,
                'questions' => Question::whereIn('id', $request->session()->get('quiz_questions_' . $attempt->id))->get(),
                'currentQuestionIndex' => $index,
                'answers' => $answers,
            ]);
        } else {
            return redirect()->route('quizzes.check-result', $attempt->id);
        }
    }    public function checkResult(Request $request, QuizAttempt $attempt)
    {
        $request->validate([
            'code' => 'required|string|exists:quizzes,code',
            'birthday' => 'required|date|before:today',
        ]);

        if ($request->code !== $attempt->quiz->code || $request->birthday !== $attempt->birthday->format('Y-m-d')) {
            return back()->withErrors(['code' => 'Kod yoki tug\'ilgan kun noto\'g\'ri.', 'birthday' => 'Kod yoki tug\'ilgan kun noto\'g\'ri.']);
        }

        $answers = $request->session()->get('quiz_answers_' . $attempt->id, []);
        $questions = Question::whereIn('id', $request->session()->get('quiz_questions_' . $attempt->id))->get()->pluck('correct_option', 'id')->toArray();
        $score = 0;
        foreach ($answers as $questionId => $answer) {
            if (isset($questions[$questionId]) && $questions[$questionId] === $answer) {
                $score++;
            }
        }

        $attempt->update(['score' => $score, 'completed_at' => now()]);
        $request->session()->forget(['quiz_start_time', 'quiz_questions_' . $attempt->id, 'quiz_answers_' . $attempt->id]);

        return redirect()->route('quizzes.result', $attempt);
    }

    public function submit(Request $request, QuizAttempt $attempt)
    {
        $request->validate([
            'answers' => 'required|array|size:20',
            'answers.*' => 'integer|between:0,3',
        ]);

        $questions = Question::whereIn('id', array_keys($request->answers))
            ->pluck('correct_option', 'id')
            ->toArray();

        $score = 0;
        foreach ($request->answers as $questionId => $answer) {
            QuizAttemptAnswer::create([
                'quiz_attempt_id' => $attempt->id,
                'question_id' => $questionId,
                'selected_option' => $answer,
            ]);

            if (isset($questions[$questionId]) && $questions[$questionId] === $answer) {
                $score++;
            }
        }

        // Calculate time taken
        $startTime = $request->session()->get('quiz_start_time');
        $timeTaken = $startTime ? now()->timestamp - $startTime : 0;

        $attempt->update([
            'score' => $score,
            'completed_at' => now(),
            'time_taken' => $timeTaken,
        ]);

        // Clear session
        $request->session()->forget('quiz_start_time');

        return redirect()->route('quizzes.result', $attempt);
    }

    public function result(QuizAttempt $attempt): Response
    {
        return Inertia::render('quizzes/result', [
            'attempt' => $attempt,
            'prize' => $attempt->score * 10000,
        ]);
    }
    public function showCheckResultForm()
    {
        return Inertia::render('quizzes/checkresult');
    }
    public function results(): Response
    {
        return Inertia::render('quizzes/results', [
            'attempts' => QuizAttempt::with('quiz')->get(),
        ]);
    }

    public function resultDetail(QuizAttempt $attempt): Response
    {
        return Inertia::render('quizzes/resultdetail', [
            'attempt' => $attempt->load('quiz', 'answers.question'),
        ]);
    }

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
