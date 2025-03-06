import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correct_option: number;
}

interface Props {
    question: Question;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Testlar', href: '/quizzes' },
    { title: 'Savollar', href: route('questions.index') },
    { title: 'Savolni Tahrirlash', href: '' },
];

const optionLabels = ['A', 'B', 'C']; // Option labels

export default function QuestionEdit({ question }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        text: question.text,
        options: question.options.slice(0, 3), // Ensure only 3 options
        correct_option: Math.min(question.correct_option, 2), // Ensure correct option is within range
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('questions.update', question.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Savolni Tahrirlash" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Savolni Tahrirlash</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-4">
                                {/* Question Text */}
                                <div className="grid gap-2">
                                    <Label htmlFor="text">Savol Matni</Label>
                                    <Input
                                        id="text"
                                        value={data.text}
                                        onChange={(e) => setData('text', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="Savolni kiriting"
                                    />
                                    <InputError message={errors.text} />
                                </div>

                                {/* Answer Options (A, B, C) */}
                                {data.options.map((option, index) => (
                                    <div key={index} className="grid gap-2">
                                        <Label htmlFor={`option-${index}`}>{optionLabels[index]} variant</Label>
                                        <Input
                                            id={`option-${index}`}
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...data.options];
                                                newOptions[index] = e.target.value;
                                                setData('options', newOptions);
                                            }}
                                            required
                                            disabled={processing}
                                            placeholder={`${optionLabels[index]} variant`}
                                        />
                                        <InputError message={errors.options?.[index]} />
                                    </div>
                                ))}

                                {/* Correct Answer Selection */}
                                <div className="grid gap-2">
                                    <Label>To'g'ri Javob</Label>
                                    <RadioGroup
                                        value={String(data.correct_option)}
                                        onValueChange={(value) => setData('correct_option', parseInt(value))}
                                        disabled={processing}
                                    >
                                        {data.options.map((option, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem value={String(index)} id={`correct-${index}`} />
                                                <Label htmlFor={`correct-${index}`}>{option || `${optionLabels[index]} variant`}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <InputError message={errors.correct_option} />
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end gap-4">
                                    <Button type="submit" disabled={processing}>
                                        Yangilash
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
