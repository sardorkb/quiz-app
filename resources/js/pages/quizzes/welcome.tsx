import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

export default function Welcome() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submitAttempt: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quizzes.start'));
    };

    const submitCheckResult: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quizzes.check-result-form'));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Quizga Xush Kelibsiz" />

            {/* Main Content */}
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center pt-16" style={{ backgroundImage: "url('/quiz.jpg')" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    {/* Left Section - Text */}
                    <div className="md:w-1/2 text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Kitob o'qing!</h1>
                        <p className="text-lg md:text-xl">Va millionerga aylaning.</p>
                    </div>

                    {/* Right Section - Form */}
                    <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Testni Boshlash yoki Natijalarni Tekshirish</h2>
                            <form onSubmit={submitAttempt} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="code">Quiz Kodi</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        required
                                        disabled={processing}
                                        placeholder="Kodni kiriting"
                                        className="border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-black"
                                    />
                                    <InputError message={errors.code} />
                                </div>
                                <div className="flex space-x-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
                                    >
                                        Testni Boshlash
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={submitCheckResult}
                                        disabled={processing}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
                                    >
                                        Natijalarni Tekshirish
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}