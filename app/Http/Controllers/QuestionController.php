<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{
    public function index()
{
    $questions = Question::paginate(10); // Change 10 to any number of questions per page

    return inertia('questions/index', [
        'questions' => $questions->items(),
        'pagination' => [
            'current_page' => $questions->currentPage(),
            'last_page' => $questions->lastPage(),
            'per_page' => $questions->perPage(),
            'total' => $questions->total(),
            'links' => $questions->linkCollection()->toArray(),
        ],
    ]);
}


    public function create(): Response
    {
        return Inertia::render('questions/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string',
            'options' => 'required|array|size:3',
            'correct_option' => 'required|integer|between:0,2',
        ]);

        Question::create($request->all());

        return redirect()->route('questions.index')->with('success', 'Savol qo\'shildi.');
    }

    public function edit(Question $question): Response
    {
        return Inertia::render('questions/edit', [
            'question' => $question,
        ]);
    }

    public function update(Request $request, Question $question)
    {
        $request->validate([
            'text' => 'required|string',
            'options' => 'required|array|size:3',
            'correct_option' => 'required|integer|between:0,2',
        ]);

        $question->update($request->all());

        return redirect()->route('questions.index')->with('success', 'Savol yangilandi.');
    }

    public function destroy(Question $question)
    {
        $question->delete();
        return redirect()->route('questions.index')->with('success', 'Savol o\'chirildi.');
    }
}
