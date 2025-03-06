import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Quiz {
    id: number;
    title: string;
    code: string;
    used: boolean;
    questions_count: number;
}

interface Props {
    quizzes: Quiz[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Testlar', href: '/quizzes' },
];

export default function QuizIndex({ quizzes }: Props) {
    const { delete: destroy } = useForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Testlar" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">Testlar</CardTitle>
                            <Link href={route('quizzes.create')}>
                                <Button>Yangi Test</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>№</TableHead>
                                    <TableHead className="text-left">Nomi</TableHead>
                                    <TableHead className="text-left">Kod</TableHead>
                                    <TableHead>Holati</TableHead>
                                    <TableHead>Amallar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {quizzes && quizzes.length > 0 ? (
                                    quizzes.map((quiz) => (
                                        <TableRow key={quiz.id}>
                                            <TableCell>{quiz.id}</TableCell>
                                            <TableCell>{quiz.title}</TableCell>
                                            <TableCell>{quiz.code}</TableCell>
                                            <TableCell>
                                                <Badge variant={quiz.used ? 'destructive' : 'success'}>
                                                    {quiz.used ? 'Ishlatilgan' : 'Ishlatilmagan'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Link href={route('quizzes.edit', quiz.id)}>
                                                    <Button variant="outline" size="sm">
                                                        Tahrirlash
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => destroy(route('quizzes.destroy', quiz.id))}
                                                >
                                                    O'chirish
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Testlar topilmadi.
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
