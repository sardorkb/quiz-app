import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Question {
    id: number;
    text: string;
    options: string[];
    correct_option: number;
}

interface Props {
    attempt: { id: number };
    questions: Question[];
    answers: { [key: number]: number };
}

export default function QuizPage({ attempt, questions, answers }: Props) {
    const { data, setData, post } = useForm({ answers: answers || {} });
    const [lockedAnswers, setLockedAnswers] = useState<{ [key: number]: number }>(answers || {});
    const [earnings, setEarnings] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAnswerSelect = (selectedIndex: number) => {
        const questionId = questions[currentQuestionIndex].id;
        const correctOption = questions[currentQuestionIndex].correct_option;
        
        if (lockedAnswers[questionId] !== undefined) return;

        setData('answers', { ...data.answers, [questionId]: selectedIndex });
        setLockedAnswers({ ...lockedAnswers, [questionId]: selectedIndex });

        if (selectedIndex === correctOption) {
            setEarnings((prev) => prev + 10000);
        }
    };

    const handleSubmit = () => {
        post(route('quizzes.submit', attempt.id), { preserveState: true, preserveScroll: true });
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Quiz Savollari" />
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center pt-16" 
                style={{ backgroundImage: "url('/quiz.jpg')" }}>
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Savol {currentQuestionIndex + 1} / {questions.length}</h2>
                        <p className="text-lg font-semibold text-red-500">Vaqt qoldi: {timeLeft} sek</p>
                        <p className="text-lg font-semibold text-green-600">Jami yutug'ingiz: {earnings.toLocaleString()} so'm</p>
                        
                        {/* Current Question */}
                        <div className="mt-6">
                            <p className="text-xl text-gray-700">{currentQuestion.text}</p>
                            <div className="space-y-3 mt-4">
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <Input
                                            type="radio"
                                            name={`answer-${currentQuestion.id}`}
                                            value={index}
                                            checked={lockedAnswers[currentQuestion.id] === index}
                                            onChange={() => handleAnswerSelect(index)}
                                            disabled={lockedAnswers[currentQuestion.id] !== undefined}
                                            className="cursor-pointer w-5 h-5"
                                        />
                                        <Label
                                            className={`text-lg cursor-pointer ${
                                                lockedAnswers[currentQuestion.id] !== undefined && index === currentQuestion.correct_option
                                                    ? 'text-green-600 font-bold'
                                                    : lockedAnswers[currentQuestion.id] === index
                                                    ? 'text-red-500'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {lockedAnswers[currentQuestion.id] !== undefined && (
                                <p className="mt-3 text-lg font-semibold text-green-600">
                                    {lockedAnswers[currentQuestion.id] === currentQuestion.correct_option
                                        ? "To'g'ri! Siz 10,000 so'm yutdingiz!"
                                        : `Noto'g'ri! To'g'ri javob: ${currentQuestion.options[currentQuestion.correct_option]}`}
                                </p>
                            )}
                        </div>
                        
                        {/* Navigation */}
                        <Button
                            type="button"
                            onClick={nextQuestion}
                            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg w-full"
                        >
                            {currentQuestionIndex < questions.length - 1 ? 'Keyingi Savol' : 'Yakunlash'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
