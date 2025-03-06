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
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface Question {
    id: number;
    text: string;
    options: string[];
    correct_option: number;
}

interface PaginationProps {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    questions: Question[];
    pagination: PaginationProps;
}

// Breadcrumbs (Global Pool)
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Savollar', href: '/questions' },
];

export default function QuestionIndex({ questions, pagination }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const { delete: destroy } = useForm();

    const confirmDelete = (question: Question) => {
        setSelectedQuestion(question);
        setOpen(true);
    };

    const handleDelete = () => {
        if (selectedQuestion) {
            destroy(route('questions.destroy', selectedQuestion.id));
            setOpen(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Savollar" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">Barcha Savollar</CardTitle>
                            <Link href={route('questions.create')}>
                                <Button>Yangi Savol</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Savol</TableHead>
                                    <TableHead>To'g'ri Javob</TableHead>
                                    <TableHead>Amallar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {questions.length > 0 ? (
                                    questions.map((question) => (
                                        <TableRow key={question.id}>
                                            <TableCell>{question.id}</TableCell>
                                            <TableCell>{question.text}</TableCell>
                                            <TableCell>{question.options[question.correct_option]}</TableCell>
                                            <TableCell className="space-x-2">
                                                <Link href={route('questions.edit', question.id)}>
                                                    <Button variant="outline" size="sm">
                                                        Tahrirlash
                                                    </Button>
                                                </Link>
                                                <AlertDialog open={open} onOpenChange={setOpen}>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => confirmDelete(question)}
                                                        >
                                                            O'chirish
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Aminmisiz?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Bu amalni ortga qaytarib bo‘lmaydi. Bu{' '}
                                                                <span className="font-medium">{selectedQuestion?.text}</span>{' '}
                                                                savolni butunlay oʻchirib tashlaydi.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={handleDelete}
                                                                >
                                                                    O'chirish
                                                                </Button>
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Savollar mavjud emas.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination Component */}
                        {/* Pagination Component */}
                        {pagination.total > pagination.per_page && (
                            <div className="mt-6 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        {/* Previous Button */}
                                        {pagination.current_page > 1 && (
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href={pagination.links[pagination.current_page - 1]?.url || '#'}
                                                />
                                            </PaginationItem>
                                        )}

                                        {/* Page Numbers (Only Numbers, No Ellipsis) */}
                                        {pagination.links
                                            .filter((link) => !isNaN(Number(link.label))) // Convert label to a number first
                                            .map((link, index) => (
                                                <PaginationItem key={index}>
                                                    <PaginationLink
                                                        href={link.url || '#'}
                                                        isActive={link.active}
                                                    >
                                                        {link.label}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                        {/* Next Button */}
                                        {pagination.current_page < pagination.last_page && (
                                            <PaginationItem>
                                                <PaginationNext
                                                    href={pagination.links[pagination.current_page + 1]?.url || '#'}
                                                />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}


                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
