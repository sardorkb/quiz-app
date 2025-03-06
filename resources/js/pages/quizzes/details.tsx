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
        <div className="min-h-screen bg-gray-100">
            <Head title="Ma'lumotlaringizni Kiriting" />
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('/quiz.jpg')",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    {/* Left Section - Text */}
                    <div className="md:w-1/2 text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{quiz.title}</h1>
                        <p className="text-lg md:text-xl">
                            Testni boshlashdan oldin quyidagi ma'lumotlarni to'ldiring.
                        </p>
                    </div>

                    {/* Right Section - Form */}
                    <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Ma'lumotlaringizni Kiriting</h2>
                            <form onSubmit={submit} className="space-y-4">
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
                                            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
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
                                            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
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
                                            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                        <InputError message={errors.phone} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="birthday">Tug'ilgan Kun</Label>
                                        <Input
                                            id="birthday"
                                            type="date"
                                            value={data.birthday}
                                            onChange={(e) => setData('birthday', e.target.value)}
                                            required
                                            disabled={processing}
                                            max={new Date().toISOString().split('T')[0]}
                                            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-black"
                                        />
                                        <InputError message={errors.birthday} />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
                                    >
                                        Testni Boshlash
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