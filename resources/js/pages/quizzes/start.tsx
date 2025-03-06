import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

export default function QuizStart() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quizzes.start'));
    };

    return (
        <>
            <Head title="Testga Xush Kelibsiz" />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Testga Xush Kelibsiz</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="code">Test Kodini Kiriting (1-100)</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    required
                                    disabled={processing}
                                    placeholder="Masalan, 42"
                                />
                                <InputError message={errors.code} />
                            </div>
                            <Button type="submit" disabled={processing}>
                                Keyingi
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}