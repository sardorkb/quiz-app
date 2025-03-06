import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface UsersPageProps {
    users: User[];
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: 'F.I.Sh.',
    },
    {
        accessorKey: 'email',
        header: 'Elektron pochta',
    },
    {
        accessorKey: 'created_at',
        header: 'Yaratildi',
        cell: ({ row }) => (
            <div>{new Date(row.getValue('created_at')).toLocaleDateString()}</div>
        ),
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Amallar</div>,
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [open, setOpen] = useState(false);

            return (
                <div className="flex justify-end gap-2">
                    <Link href={route('users.edit', row.getValue('id'))}>
                        <Button variant="outline" size="sm">
                            Tahrirlash
                        </Button>
                    </Link>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                                O'chirish
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Aminmisiz?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Bu amalni ortga qaytarib bo‘lmaydi. Bu <span className="font-medium">{row.getValue('name')} </span>
                                    foydalanuvchini butunlay oʻchirib tashlaydi.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Link
                                        href={route('users.destroy', row.getValue('id'))}
                                        method="delete"
                                        onClick={() => setOpen(false)}
                                    >
                                        O'chirish
                                    </Link>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Foydalanuvchilar',
        href: '/users',
    },
];

export default function Foydalanuvchilar({ users }: UsersPageProps) {
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Foydalanuvchilar" />
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">Foydalanuvchilar</CardTitle>
                            <Link href={route('users.create')}>
                                <Button>Yangi foydalanuvchi</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && 'selected'}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                Foydalanuvchi topilmadi.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}