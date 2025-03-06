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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Savollar', href: route('questions.index') },
    { title: 'Yangi Savol', href: '' },
];

const optionLabels = ['A', 'B', 'C']; // Labels for options

export default function QuestionCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        text: '',
        options: ['', '', ''], // Only 3 options (A, B, C)
        correct_option: 0, // Default correct option is A
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('questions.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Yangi Savol" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Yangi Savol</CardTitle>
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
                                        onValueChange={(value: string) => setData('correct_option', parseInt(value))}
                                        disabled={processing}
                                    >
                                        {data.options.map((_, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem value={String(index)} id={`correct-${index}`} />
                                                <Label htmlFor={`correct-${index}`}>{optionLabels[index]} variant</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <InputError message={errors.correct_option} />
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end gap-4">
                                    <Button variant="outline" type="button" disabled={processing} onClick={() => reset()}>
                                        Tozalash
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        Saqlash
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
