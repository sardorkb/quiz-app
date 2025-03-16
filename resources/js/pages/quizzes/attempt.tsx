import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Question {
    id: number;
    text: string;
    options: string[];
}

interface AttemptProps {
    attempt: {
        id: number;
        quiz_id: number;
        name: string;
    };
    questions: Question[];
}

export default function QuizAttempt({ attempt, questions }: AttemptProps) {
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
    const { data, setData, post } = useForm<{ answers: Record<number, number> }>({ answers: {} });

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
            return;
        }

        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleSelectAnswer = (questionId: number, optionIndex: number) => {
        setData('answers', { ...data.answers, [questionId]: optionIndex });
    };

    const handleSubmit = () => {
        post(route('quizzes.submit', attempt.id));
    };

    return (
        <AppLayout>
            <Head title="Testni Boshlash" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Testni Boshlash</CardTitle>
                        <p className="text-red-500 font-bold">Qolgan vaqt: {timeLeft} sekund</p>
                    </CardHeader>
                    <CardContent>
                        {questions.map((question) => (
                            <div key={question.id} className="mb-4">
                                <p className="font-semibold">{question.text}</p>
                                {question.options.map((option, index) => (
                                    <label key={index} className="block">
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={index}
                                            onChange={() => handleSelectAnswer(question.id, index)}
                                            checked={data.answers[question.id] === index}
                                        />{' '}
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ))}

                        <Button onClick={handleSubmit} className="mt-4">
                            Yuborish
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
