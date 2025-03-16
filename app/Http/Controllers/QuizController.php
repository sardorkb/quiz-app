<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\QuizAttemptAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        // Randomize questions once and store in session
        $questions = Question::inRandomOrder()->limit(100)->get();
        $questionIds = $questions->pluck('id')->toArray();
        $request->session()->put('quiz_questions_' . $attempt->id, $questionIds);

        $request->session()->put('quiz_start_time', now()->timestamp);
        $request->session()->put('question_start_time_' . $attempt->id, now()->timestamp);

        return Inertia::render('quizzes/quizpage', [
            'attempt' => $attempt,
            'questions' => $questions,
            'currentQuestionIndex' => 0,
            'answers' => [],
            'timeLeft' => 60,
        ]);
    }

    public function next(Request $request, QuizAttempt $attempt)
    {
        $index = $request->input('index', 0);
        $questionId = $request->input('question_id');
        $answer = $request->input('answers.' . $questionId);

        $sessionKey = 'quiz_answers_' . $attempt->id;
        $answers = $request->session()->get($sessionKey, []);

        if ($answer !== null) {
            $answers[$questionId] = (int) $answer;
            $request->session()->put($sessionKey, $answers);

            QuizAttemptAnswer::updateOrCreate(
                [
                    'quiz_attempt_id' => $attempt->id,
                    'question_id' => $questionId,
                ],
                ['selected_option' => (int) $answer]
            );
        }

        $questionStartKey = 'question_start_time_' . $attempt->id;
        $questionStartTime = $request->session()->get($questionStartKey);
        $timeSpent = now()->timestamp - $questionStartTime;

        if ($timeSpent > 60) {
            $answers[$questionId] = -1; // Use -1 instead of null for "no answer"
            QuizAttemptAnswer::updateOrCreate(
                [
                    'quiz_attempt_id' => $attempt->id,
                    'question_id' => $questionId,
                ],
                ['selected_option' => -1] // Use -1 instead of null
            );
        }

        $lastQuestion = Question::find($questionId);
        $isLastCorrect = $lastQuestion && $answer !== null && $lastQuestion->correct_option === (int) $answer;

        // Use the stored randomized order from session
        $questionIds = $request->session()->get('quiz_questions_' . $attempt->id);
        $questions = Question::whereIn('id', $questionIds)
            ->orderByRaw('FIELD(id, ' . implode(',', $questionIds) . ')')
            ->get();

        $score = 0;
        $correctOptions = $questions->pluck('correct_option', 'id')->toArray();
        foreach ($answers as $qId => $ans) {
            if ($ans >= 0 && isset($correctOptions[$qId]) && $correctOptions[$qId] === $ans) {
                $score++;
            }
        }
        $totalEarnings = $score * 10000;

        // Check if last answer was incorrect
        if (!$isLastCorrect && $answer !== null) {
            $attempt->update([
                'score' => $score,
                'completed_at' => now(),
                'time_taken' => now()->timestamp - $request->session()->get('quiz_start_time', now()->timestamp),
            ]);

            $request->session()->forget([
                'quiz_start_time',
                'quiz_questions_' . $attempt->id,
                'quiz_answers_' . $attempt->id,
                'question_start_time_' . $attempt->id,
            ]);

            return redirect()->route('quizzes.result', $attempt->id);
        }

        $totalQuestions = 100;
        if ($index >= $totalQuestions) {
            $attempt->update([
                'score' => $score,
                'completed_at' => now(),
                'time_taken' => now()->timestamp - $request->session()->get('quiz_start_time', now()->timestamp),
            ]);

            foreach ($answers as $qId => $ans) {
                QuizAttemptAnswer::updateOrCreate(
                    [
                        'quiz_attempt_id' => $attempt->id,
                        'question_id' => $qId,
                    ],
                    ['selected_option' => $ans]
                );
            }

            $request->session()->forget([
                'quiz_start_time',
                'quiz_questions_' . $attempt->id,
                'quiz_answers_' . $attempt->id,
                'question_start_time_' . $attempt->id,
            ]);

            return redirect()->route('quizzes.result', $attempt->id);
        }

        $request->session()->put($questionStartKey, now()->timestamp);

        return Inertia::render('quizzes/quizpage', [
            'attempt' => $attempt,
            'questions' => $questions,
            'currentQuestionIndex' => $index,
            'answers' => $answers,
            'timeLeft' => 60,
            'isLastCorrect' => $isLastCorrect,
            'totalEarnings' => $totalEarnings,
        ]);
    }

    public function showCheckResultForm(Request $request)
    {
        return Inertia::render('quizzes/checkresult');
    }

    public function checkResult(Request $request)
    {
        $request->validate([
            'code' => 'required|string|exists:quizzes,code',
            'birthday' => 'required|date|before:today',
        ]);

        $quiz = Quiz::where('code', $request->code)->first();
        $attempt = QuizAttempt::where('quiz_id', $quiz->id)
            ->whereDate('birthday', $request->birthday)
            ->first();

        if (!$attempt) {
            return back()->withErrors(['code' => 'Kod yoki tug\'ilgan kun noto\'g\'ri.']);
        }

        return redirect()->route('quizzes.result', $attempt->id);
    }

    public function result(QuizAttempt $attempt)
    {
        // Fetch the user's answers in the order they were submitted
        $answers = $attempt->answers()
            ->orderBy('created_at')
            ->get()
            ->pluck('selected_option', 'question_id')
            ->toArray();

        // Get the question IDs from the answers in the order they were answered
        $answeredQuestionIds = array_keys($answers);

        // Fetch questions in the same order as they were answered
        $questions = Question::whereIn('id', $answeredQuestionIds)
            ->orderByRaw('FIELD(id, ' . implode(',', $answeredQuestionIds) . ')')
            ->get();

        // Prepare data for the frontend
        $questionData = $questions->map(function ($question) use ($answers) {
            $userAnswer = $answers[$question->id] ?? -1; // Default to -1 if not found
            return [
                'id' => $question->id,
                'text' => $question->text,
                'options' => $question->options,
                'correct_option' => $question->correct_option,
                'correct_answer' => $question->options[$question->correct_option] ?? 'N/A',
                'user_answer' => $userAnswer >= 0 ? $question->options[$userAnswer] ?? 'N/A' : 'Javob tanlanmagan',
                'is_correct' => $userAnswer >= 0 && $userAnswer === $question->correct_option,
            ];
        })->toArray();

        return Inertia::render('quizzes/result', [
            'attempt' => $attempt,
            'prize' => $attempt->prize ?? ($attempt->score * 10000),
            'questions' => $questionData,
        ]);
    }

    public function index()
    {
        return Inertia::render('quizzes/index', [
            'quizzes' => Quiz::all(),
        ]);
    }

    public function create()
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

    public function edit(Quiz $quiz)
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

    public function results()
    {
        $attempts = QuizAttempt::with('quiz')->get();
        return Inertia::render('quizzes/quizresults', [
            'attempts' => $attempts,
        ]);
    }

    public function resultDetail(QuizAttempt $attempt)
    {
        // Eager-load the quiz relationship
        $attempt->load('quiz');

        // Fetch the user's answers in the order they were submitted
        $answers = $attempt->answers()
            ->orderBy('created_at')
            ->get()
            ->pluck('selected_option', 'question_id')
            ->toArray();

        // Get the question IDs from the answers in the order they were answered
        $answeredQuestionIds = array_keys($answers);

        // Fetch questions in the same order as they were answered
        $questions = Question::whereIn('id', $answeredQuestionIds)
            ->orderByRaw('FIELD(id, ' . implode(',', $answeredQuestionIds) . ')')
            ->get();

        // Prepare data for the frontend
        $questionData = $questions->map(function ($question) use ($answers) {
            $userAnswer = $answers[$question->id] ?? -1; // Default to -1 if not found
            return [
                'id' => $question->id,
                'text' => $question->text,
                'options' => $question->options,
                'correct_option' => $question->correct_option,
                'correct_answer' => $question->options[$question->correct_option] ?? 'N/A',
                'user_answer' => $userAnswer >= 0 ? $question->options[$userAnswer] ?? 'N/A' : 'Javob berilmagan',
                'is_correct' => $userAnswer >= 0 && $userAnswer === $question->correct_option,
            ];
        })->toArray();

        return Inertia::render('quizzes/resultdetail', [
            'attempt' => $attempt,
            'prize' => $attempt->prize ?? ($attempt->score * 10000),
            'questions' => $questionData,
        ]);
    }
}