import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Quiz {
    id: number;
    title: string;
    code: string;
    used: boolean; // Added "Holati"
}

interface Props {
    quiz: Quiz;
}

export default function QuizEdit({ quiz }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: quiz.title,
        code: quiz.code,
        used: quiz.used ? '1' : '0', // Convert boolean to string for <Select>
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(route('quizzes.update', quiz.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Testlar', href: '/quizzes' }, {
            title: 'Tahrirlash',
            href: ''
        }]}>
            <Head title="Testni Tahrirlash" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Testni Tahrirlash</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Nomi</Label>
                                <Input 
                                    type="text" 
                                    value={data.title} 
                                    onChange={(e) => setData('title', e.target.value)} 
                                    required 
                                />
                                {errors.title && <p className="text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <Label>Kod</Label>
                                <Input 
                                    type="text" 
                                    value={data.code} 
                                    onChange={(e) => setData('code', e.target.value)} 
                                    required 
                                />
                                {errors.code && <p className="text-red-500">{errors.code}</p>}
                            </div>

                            {/* Holati (Used Status) */}
                            <div>
                                <Label>Holati</Label>
                                <Select 
                                    value={data.used} 
                                    onValueChange={(value) => setData('used', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Holatini tanlang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Ishlatilmagan</SelectItem>
                                        <SelectItem value="1">Ishlatilgan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.used && <p className="text-red-500">{errors.used}</p>}
                            </div>

                            <Button type="submit" disabled={processing}>
                                Yangilash
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
