import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Quiz {
    id: number;
    title: string;
    code: string;
}

interface Question {
    id: number;
    text: string;
    options: string[];
    correct_option: number;
}

interface Answer {
    id: number;
    question_id: number;
    selected_option: number;
    question: Question;
}

interface Attempt {
    id: number;
    quiz_id: number;
    name: string;
    address: string;
    phone: string;
    birthday: string;
    score: number;
    completed_at: string;
    time_taken: number; // In seconds
    quiz: Quiz;
    answers: Answer[];
}

interface Props {
    attempt: Attempt;
}

// Format time taken (seconds) into "X minutes Y seconds"
const formatTimeTaken = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} daqiqa ${remainingSeconds} soniya`;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Natijalar', href: '/results' },
    { title: 'Natija Tafsilotlari', href: '' },
];

export default function QuizResultDetail({ attempt }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Natija Tafsilotlari" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {attempt.name} uchun Natija Tafsilotlari
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <div className="flex justify-between">
                                <span className="font-medium">Ism:</span>
                                <span>{attempt.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Test Kodi:</span>
                                <span>{attempt.quiz.code}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Ball:</span>
                                <span>{attempt.score} / 20</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Yutuq:</span>
                                <span>{(attempt.score * 10000).toLocaleString('uz-UZ')} so'm</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Tug'ilgan Kun:</span>
                                <span>{new Date(attempt.birthday).toLocaleDateString('uz-UZ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Yakunlangan Vaqt:</span>
                                <span>{new Date(attempt.completed_at).toLocaleString('uz-UZ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Sarflangan Vaqt:</span>
                                <span>{formatTimeTaken(attempt.time_taken)}</span>
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Savollar va Javoblar</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {attempt.answers.map((answer, index) => (
                                    <div key={answer.id} className="space-y-2">
                                        <p className="text-lg font-medium">
                                            {index + 1}. {answer.question.text}
                                        </p>
                                        <div className="space-y-1">
                                            {answer.question.options.map((option, optionIndex) => {
                                                const isSelected = optionIndex === answer.selected_option;
                                                const isCorrect = optionIndex === answer.question.correct_option;
                                                let textColor = 'text-gray-700';
                                                if (isSelected) {
                                                    textColor = isCorrect ? 'text-green-600' : 'text-red-600';
                                                }

                                                return (
                                                    <div
                                                        key={optionIndex}
                                                        className="flex items-center space-x-2 p-2 border border-gray-300 rounded"
                                                    >
                                                        <span
                                                            className={`w-4 h-4 rounded-full border-2 ${
                                                                isSelected
                                                                    ? isCorrect
                                                                        ? 'border-green-600 bg-green-600'
                                                                        : 'border-red-600 bg-red-600'
                                                                    : 'border-gray-400'
                                                            } inline-block`}
                                                        ></span>
                                                        <span className={textColor}>{option}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-green-600">
                                                To'g'ri Javob: {answer.question.options[answer.question.correct_option]}
                                            </p>
                                            <p className="text-sm">
                                                Yutuq: {(answer.selected_option === answer.question.correct_option ? 10000 : 0).toLocaleString('uz-UZ')} so'm
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 text-right">
                                    <p className="font-medium">Umumiy Yutuq: {(attempt.score * 10000).toLocaleString('uz-UZ')} so'm</p>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}