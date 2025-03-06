import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function ResultPage({ attempt, prize }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Head title="Natijalar" />
            <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Natijalari</h2>
                <p className="text-xl font-semibold text-green-600">Umumiy ball: {attempt.score} / 20</p>
                <p className="text-lg text-blue-600 mt-2">Jami yutuq: {prize.toLocaleString()} so'm</p>
                
                <div className="mt-6">
                    <Button 
                        onClick={() => window.location.href = '/'} 
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
                    >
                        Bosh sahifaga qaytish
                    </Button>
                </div>
            </div>
        </div>
    );
}