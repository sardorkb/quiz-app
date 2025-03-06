import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

interface Props {
    attempt: { id: number };
}

export default function CheckResult({ attempt }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        birthday: '',
        attempt_id: attempt.id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quizzes.check-result', attempt.id));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <Head title="Natijalarni Tekshirish" />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Natijalarni Tekshirish</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="code">Quiz Kodi</Label>
                                <Input
                                    id="code"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    required
                                    disabled={processing}
                                    placeholder="Kodni kiriting"
                                />
                                <InputError message={errors.code} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="birthday">Tug\'ilgan Kun</Label>
                                <Input
                                    id="birthday"
                                    type="date"
                                    value={data.birthday}
                                    onChange={(e) => setData('birthday', e.target.value)}
                                    required
                                    disabled={processing}
                                    max={new Date().toISOString().split('T')[0]}
                                />
                                <InputError message={errors.birthday} />
                            </div>
                            <Button type="submit" disabled={processing} className="w-full">
                                Keyingi
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}