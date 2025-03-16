import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    address: string;
    phone: string;
    birthday: string;
    score: number;
    completed_at: string;
    time_taken: number;
    quiz?: {
        id: number;
        title: string;
        code: string;
    };
}

interface Props {
    attempt: QuizAttempt;
    prize: number;
    questions: Question[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Natijalar', href: '/results' },
    { title: 'Tafsilotlar', href: '#' },
];

export default function ResultDetail({ attempt, prize, questions }: Props) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const questionsPerPage = 10;

    // Filter questions to ensure only answered ones are shown (backend should already do this)
    const answeredQuestions = questions.filter(
        (question) => question.user_answer !== 'Javob berilmagan' && question.user_answer !== 'No answer'
    );
    const totalAnsweredQuestions = answeredQuestions.length;
    const totalPages = Math.ceil(totalAnsweredQuestions / questionsPerPage);

    // Get current questions for the page
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = answeredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // Handle page change
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Natija Tafsilotlari" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Natija Tafsilotlari - {attempt.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 text-gray-700">
                            <p>
                                <strong>Test Kodi:</strong>{' '}
                                {attempt.quiz?.code ?? 'N/A'}
                            </p>
                            <p>
                                <strong>Jami Ball:</strong> {attempt.score} / {totalAnsweredQuestions}
                            </p>
                            <p>
                                <strong>Yutuq:</strong> {prize.toLocaleString('uz-UZ')} so'm
                            </p>
                            <p>
                                <strong>Yakunlangan Vaqt:</strong>{' '}
                                {new Date(attempt.completed_at).toLocaleString('uz-UZ')}
                            </p>
                            <p>
                                <strong>Jami Vaqt:</strong>{' '}
                                {formatTimeTaken(attempt.time_taken)}
                            </p>
                        </div>

                        {/* Questions Breakdown */}
                        {totalAnsweredQuestions > 0 ? (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Savollar va Javoblar
                                </h3>
                                {currentQuestions.map((question, index) => (
                                    <div
                                        key={question.id}
                                        className={`p-4 rounded-lg ${
                                            question.is_correct
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
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === number
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
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Helper function to format time
const formatTimeTaken = (seconds: number) => {
    const minutes = Math.floor(Math.abs(seconds) / 60);
    const remainingSeconds = Math.abs(seconds) % 60;
    return `${minutes} daqiqa ${remainingSeconds} soniya`;
};