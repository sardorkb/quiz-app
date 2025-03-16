import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';

interface Quiz {
    id?: number;
    title: string;
    code: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface Props {
    quiz?: Quiz;
}

export default function QuizForm({ quiz }: Props) {
    const isEdit = !!quiz;
    const { data, setData, post, put, processing, errors } = useForm<Quiz>({
        title: quiz?.title || '',
        code: quiz?.code || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('quizzes.update', quiz?.id));
        } else {
            post(route('quizzes.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={isEdit ? [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Testlar', href: '/quizzes' },
            { title: 'Tahrirlash', href: '#' },
        ] : [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Testlar', href: '/quizzes' },
            { title: 'Yangi Test', href: '#' },
        ]}>
            <Head title={isEdit ? 'Testni Tahrirlash' : 'Yangi Test'} />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {isEdit ? 'Testni Tahrirlash' : 'Yangi Test'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Nomi</label>
                                <Input
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Kod</label>
                                <Input
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                />
                                {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                            </div>
                            <Button type="submit" disabled={processing}>
                                {isEdit ? 'Saqlash' : 'Yaratish'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}