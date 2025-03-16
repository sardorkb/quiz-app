import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react'; // Added Link
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Quiz {
    id: number;
    title: string;
    code: string;
}

interface Attempt {
    id: number;
    quiz_id: number;
    name: string;
    address: string;
    phone: string;
    birthday: string;
    score: number;
    completed_at: string;
    time_taken: number;
    quiz: Quiz;
}

interface Props {
    attempts: Attempt[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Natijalar', href: '/results' },
];

export default function QuizResults({ attempts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Natijalar" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Test Natijalari</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Ism</TableHead>
                                    <TableHead>Test Kodi</TableHead>
                                    <TableHead>Ball</TableHead>
                                    <TableHead>Yutuq</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attempts.length ? (
                                    attempts.map((attempt) => (
                                        <TableRow key={attempt.id}>
                                            <TableCell>{attempt.id}</TableCell>
                                            <TableCell>
                                                <Link href={route('quizzes.result.detail', attempt.id)} className="text-blue-600 hover:underline">
                                                    {attempt.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{attempt.quiz.code}</TableCell>
                                            <TableCell>{attempt.score} / 20</TableCell>
                                            <TableCell>{(attempt.score * 10000).toLocaleString('uz-UZ')} so'm</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Natijalar topilmadi.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}