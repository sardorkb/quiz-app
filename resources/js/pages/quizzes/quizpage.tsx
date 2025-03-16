import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Question {
    id: number;
    text: string;
    options: string[];
    correct_option: number;
}

interface QuizAttempt {
    id: number;
    quiz_id: number;
    name: string;
}

interface Props {
    attempt: QuizAttempt;
    questions: Question[];
    currentQuestionIndex: number;
    answers: Record<number, number | null>;
    timeLeft: number;
    isLastCorrect?: boolean;
    totalEarnings?: number;
}

interface FormData {
    index: number;
    question_id: number;
    answers: Record<number, number>;
}

export default function QuizPage({
    attempt,
    questions,
    currentQuestionIndex: initialIndex,
    answers: initialAnswers,
    timeLeft: initialTimeLeft,
    isLastCorrect,
    totalEarnings = 0,
}: Props) {
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
    const totalQuestions = 100;
    const currentQuestion = questions[initialIndex];

    const { data, setData, post, processing, errors } = useForm<FormData>({
        index: initialIndex + 1,
        question_id: currentQuestion.id,
        answers: { ...initialAnswers },
    });

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            handleNext(); // Auto-submit when time runs out
        }
    }, [timeLeft]);

    const handleNext = () => {
        console.log('Next clicked');
        const newIndex = initialIndex + 1;
        const newQuestionId = questions[newIndex]?.id;

        if (timeLeft === 0 && data.answers[currentQuestion.id] === undefined) {
            setData('answers', {
                ...data.answers,
                [currentQuestion.id]: -1, // Use -1 instead of null for "no answer"
            });
        }

        post(route('quizzes.next', attempt.id), {
            data: {
                index: newIndex,
                question_id: newQuestionId,
                answers: data.answers,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log('Navigation successful');
                setTimeLeft(60);
                setData({
                    index: newIndex + 1,
                    question_id: newQuestionId,
                    answers: data.answers,
                });
            },
            onError: (err) => {
                console.error('Navigation error:', err);
            },
        });
    };

    const handleOptionChange = (value: string) => {
        console.log('Option selected:', value);
        setData('answers', {
            ...data.answers,
            [currentQuestion.id]: parseInt(value),
        });
    };

    return (
        <>
            <Head title={`Test - Savol ${initialIndex + 1}`} />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <div className="relative flex-1 flex items-center justify-center bg-cover bg-center py-16 px-4" style={{ backgroundImage: "url('/quiz.jpg')" }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative max-w-4xl mx-auto w-full bg-white/95 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <div className="text-gray-800 font-semibold">
                                Savol {initialIndex + 1} / {totalQuestions}
                            </div>
                            <div className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-800'}`}>
                                Qolgan vaqt: {timeLeft}s
                            </div>
                            <div className="text-green-600 font-semibold">
                                Jami yutuq: {totalEarnings.toLocaleString()} so'm
                            </div>
                        </div>

                        {isLastCorrect !== undefined && initialIndex > 0 && (
                            <div className={`mb-6 p-4 rounded-lg text-center ${isLastCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {isLastCorrect ? 'To\'g\'ri javob! 10,000 so\'m yutdingiz!' : 'Noto\'g\'ri javob, keyingi safar omad!'}
                            </div>
                        )}

                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                            {currentQuestion.text}
                        </h2>

                        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
                            <RadioGroup
                                value={data.answers[currentQuestion.id]?.toString() || ''}
                                onValueChange={handleOptionChange}
                                className="space-y-4"
                            >
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={index.toString()}
                                            id={`option-${index}`}
                                            disabled={processing || timeLeft === 0}
                                            className="border-orange-500 text-orange-500"
                                        />
                                        <Label
                                            htmlFor={`option-${index}`}
                                            className="text-gray-700 text-base cursor-pointer"
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            <InputError message={errors[`answers.${currentQuestion.id}`]} />

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                >
                                    {initialIndex === totalQuestions - 1 ? 'Yakunlash' : 'Keyingi'}
                                </Button>
                            </div>
                        </form>
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