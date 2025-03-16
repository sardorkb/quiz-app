import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
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

    const submitWelcome = () => {
        router.visit(route('quizzes.start')); // Navigate to Welcome page
    };

    return (
        <>
            <Head title="Natijalarni Tekshirish" />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Hero Section */}
                <div
                    className="relative flex-1 flex items-center justify-center bg-cover bg-center py-16 px-4"
                    style={{ backgroundImage: "url('/quiz.jpg')" }}
                >
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Section - Text */}
                        <div className="text-white space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                                Natijalarni Tekshiring!
                            </h1>
                            <p className="text-xl md:text-2xl font-medium drop-shadow-md">
                                O'z yutuqlaringizni bilib oling
                            </p>
                            <div className="flex gap-4 text-sm md:text-base">
                                <div className="bg-orange-500/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                                    <span className="block font-bold">Oson va Tez</span>
                                    <span>Kod bilan tekshirish</span>
                                </div>
                                <div className="bg-orange-500/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                                    <span className="block font-bold">Xavfsiz</span>
                                    <span>Ma'lumotlar himoyalangan</span>
                                </div>
                                <div className="bg-orange-500/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                                    <span className="block font-bold">Tez Natija</span>
                                    <span>Bir necha soniyada</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Form */}
                        <div className="bg-white/95 p-6 rounded-xl shadow-2xl backdrop-blur-sm transform transition-all hover:shadow-xl">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                                Natijalarni Tekshirish
                            </h2>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="code" className="text-gray-700 font-medium">
                                        Test Kodi
                                    </Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="Masalan: TEST123"
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
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        type="button"
                                        onClick={submitWelcome}
                                        disabled={processing}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        Testni boshlash
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Yuklanmoqda...' : 'Natijalarni ko\'rish'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Millioner bo'laman. Barcha huquqlar himoyalangan.
                    </p>
                </footer>
            </div>
        </>
    );
}