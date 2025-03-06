import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card className="shadow-2xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-white py-6 text-center border-b">
                            <CardTitle className="text-2xl font-bold text-gray-800">Testga Xush Kelibsiz</CardTitle>
                        </CardHeader>
                        <CardContent className="bg-gray-50 p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="code" className="text-gray-700 text-sm font-medium">
                                        Testni boshlash uchun sizga berilgan ID raqamni kiriting
                                    </Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="Masalan: 123456"
                                        className="rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                                    />
                                    <InputError message={errors.code} />
                                </div>
                                <Button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                                >
                                    Keyingi
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}
