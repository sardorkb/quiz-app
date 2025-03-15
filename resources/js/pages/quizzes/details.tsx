// resources/js/Pages/Quizzes/Details.tsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
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
        birthday: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quizzes.attempt'));
    };

    return (
        <>
            <Head title="Ma'lumotlaringizni Kiriting" />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Main Content */}
                <div
                    className="relative flex-1 flex items-center justify-center bg-cover bg-center py-16 px-4"
                    style={{ backgroundImage: "url('/quiz.jpg')" }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Section - Text */}
                        <div className="text-white space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                                {quiz.title}
                            </h1>
                            <p className="text-xl md:text-2xl font-medium drop-shadow-md">
                                Testni boshlashdan oldin ma'lumotlaringizni kiriting
                            </p>
                            <div className="bg-orange-500/80 px-6 py-3 rounded-lg backdrop-blur-sm inline-block">
                                <span className="text-lg font-semibold">Kod: {quiz.code}</span>
                            </div>
                        </div>

                        {/* Right Section - Form */}
                        <div className="bg-white/95 p-6 rounded-xl shadow-2xl backdrop-blur-sm transform transition-all hover:shadow-xl">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                                Shaxsiy Ma'lumotlar
                            </h2>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-gray-700 font-medium">
                                            Ism
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            disabled={processing}
                                            placeholder="To'liq ismingizni kiriting"
                                            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-gray-400 py-3 transition-all"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="address" className="text-gray-700 font-medium">
                                            Manzil
                                        </Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            required
                                            disabled={processing}
                                            placeholder="Yashash manzilingiz"
                                            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-gray-400 py-3 transition-all"
                                        />
                                        <InputError message={errors.address} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                                            Telefon
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                            disabled={processing}
                                            placeholder="+998 XX XXX XX XX"
                                            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-gray-400 py-3 transition-all"
                                        />
                                        <InputError message={errors.phone} />
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
                                        {processing ? 'Yuklanmoqda...' : 'Testni Boshlash'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} QuizMaster. Barcha huquqlar himoyalangan.
                    </p>
                </footer>
            </div>
        </>
    );
}