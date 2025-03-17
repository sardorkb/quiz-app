import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correct_answer: string;
    user_answer: string;
    is_correct: boolean;
}

interface QuizAttempt {
    id: number;
    quiz_id: number;
    name: string;
    score: number;
}

interface Props {
    attempt: QuizAttempt;
    prize: number;
    questions: Question[];
}

export default function Result({ attempt, prize, questions }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;

    // Filter questions to show only answered ones (though backend should already do this)
    const answeredQuestions = questions.filter(
        (question) => question.user_answer !== 'Javob berilmagan' && question.user_answer !== 'Javob tanlanmagan'
    );
    const totalAnsweredQuestions = answeredQuestions.length;
    const totalPages = Math.ceil(totalAnsweredQuestions / questionsPerPage);

    // Check if the user lost (at least one wrong answer)
    const hasWrongAnswer = answeredQuestions.some((question) => !question.is_correct);
    const isWinner = !hasWrongAnswer && totalAnsweredQuestions > 0; // User wins if all answers are correct

    // Get current questions for the page
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = answeredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // Handle page change
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <Head title="Quiz Natijalari" />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <div
                    className="relative flex-1 flex items-center justify-center bg-cover bg-center py-16 px-4"
                    style={{ backgroundImage: "url('/quiz.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative max-w-4xl mx-auto w-full bg-white/95 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
                        {/* Header Section with Conditional Message */}
                        <div className="text-center mb-8">
                            {isWinner ? (
                                <>
                                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                                        Tabriklaymiz, {attempt.name}!
                                    </h1>
                                    <p className="text-xl text-gray-700">
                                        Siz {totalAnsweredQuestions}ta savolni to'g'ri javob berdingiz!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                                        Afsuski, {attempt.name}, siz yutqazdingiz!
                                    </h1>
                                    <p className="text-xl text-gray-700">
                                        Siz {totalAnsweredQuestions} ta savoldan {attempt.score} tasiga to'g'ri javob berdingiz, lekin birinchi xato bilan yakunlandi.
                                    </p>
                                    <p className="text-2xl font-semibold mt-2">
                                        <span className="text-green-600">Sizning yutug'ingiz: {prize.toLocaleString()} so'm</span>
                                    </p>
                                </>
                            )}
                            <p className="text-2xl font-semibold mt-2">
                                {isWinner ? (
                                    <span className="text-green-600">Sizning yutug'ingiz: {prize.toLocaleString()} so'm</span>
                                ) : (
                                    <span className="text-red-600">Omadignzi keyingi safar yana sinab ko'ring.</span>
                                )}
                            </p>
                        </div>

                        {/* Questions Breakdown */}
                        {totalAnsweredQuestions > 0 ? (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Sizning natijalaringiz
                                </h2>
                                {currentQuestions.map((question, index) => (
                                    <div
                                        key={question.id}
                                        className={`p-4 rounded-lg ${question.is_correct
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        <p className="font-medium">
                                            Savol {indexOfFirstQuestion + index + 1}: {question.text}
                                        </p>
                                        <p className="mt-2">
                                            <span className="font-semibold">Sizning javobingiz: </span>
                                            {question.user_answer}
                                        </p>
                                        <p>
                                            <span className="font-semibold">To'g'ri javob: </span>
                                            {question.correct_answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-700">
                                Hech qanday savolga javob berilmagan.
                            </div>
                        )}

                        {/* Pagination - Show only if there are multiple pages */}
                        {totalAnsweredQuestions > 0 && totalPages > 1 && (
                            <div className="mt-6 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-all"
                                >
                                    Oldingi
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === number
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                            } transition-all`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-all"
                                >
                                    Keyingi
                                </button>
                            </div>
                        )}

                        {/* Back to Home Button */}
                        <div className="mt-8 flex justify-center">
                            <a
                                href={route('quizzes.start')}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                            >
                                Bosh Sahifaga Qaytish
                            </a>
                        </div>
                    </div>
                </div>

                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Millioner bo'laman. Barcha huquqlar himoyalangan.
                    </p>
                </footer>
            </div>
        </>
    );
}