import { Branch } from '@/models';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const columns: ColumnDef<Branch>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'branch',
    header: 'الفرع',
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'email',
    header: 'البريد الالكتروني',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاريخ الانشاء',
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return format(new Date(createdAt), 'yyyy-MM-dd');
    },
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to="/employees/1/show"
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to="/clients/1/edit"
            >
              تعديل
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
