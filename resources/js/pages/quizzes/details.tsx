import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

interface Quiz {
    id: number;
    title: string;
    code: string;
}

interface Props {
    quiz: Quiz;
}

export default function QuizDetails({ quiz }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        quiz_id: quiz.id,
        name: '',
        address: '',
        phone: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quizzes.attempt'));
    };

    return (
        <>
            <Head title="Ma'lumotlaringizni Kiriting" />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>{quiz.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Ism</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="To'liq Ismingiz"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Manzil</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="Manzilingiz"
                                    />
                                    <InputError message={errors.address} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Telefon</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="Telefon Raqamingiz"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                                <Button type="submit" disabled={processing}>
                                    Testni Boshlash
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}