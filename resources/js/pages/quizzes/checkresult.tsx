import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

export default function CheckResult() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        birthday: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quizzes.check-result'));
    };

    return (
        <>
            <Head title="Natijalarni Tekshirish" />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <div
                    className="relative flex-1 flex items-center justify-center bg-cover bg-center py-16 px-4"
                    style={{ backgroundImage: "url('/quiz.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative max-w-4xl mx-auto w-full bg-white/95 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                            Natijalarni Tekshirish
                        </h2>
                        <p className="text-center text-gray-600 mb-6">
                            Quiz natijalaringizni ko'rish uchun kod va tug'ilgan kuningizni kiriting.
                        </p>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="code" className="text-gray-700 font-medium">
                                        Quiz Kodi
                                    </Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="Masalan: QUIZ123"
                                        className="border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-gray-400 py-3 transition-all"
                                    />
                                    <InputError message={errors.code} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="birthday" className="text-gray-700 font-medium">
                                        Tug'ilgan Kun
                                    </Label>
                                    <Input
                                        id="birthday"
                                        type="date"
                                        value={data.birthday}
                                        onChange={(e) => setData('birthday', e.target.value)}
                                        required
                                        disabled={processing}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-black py-3 transition-all"
                                    />
                                    <InputError message={errors.birthday} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Yuklanmoqda...' : 'Natijalarni Ko\'rish'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} QuizMaster. Barcha huquqlar himoyalangan.
                    </p>
                </footer>
            </div>
        </>
    );
}