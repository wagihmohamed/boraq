import { Client } from '@/models';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Badge } from '@mantine/core';
import { format } from 'date-fns';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'branch',
    header: 'الفرع',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'type',
    header: 'نوع الحساب',
    cell: ({ row }) => {
      const { type } = row.original;
      return (
        <div>
          {type === 'customer' ? (
            <Badge>عميل</Badge>
          ) : (
            <Badge color="red">مساعد عميل</Badge>
          )}
        </div>
      );
    },
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
              to="/employees/1/edit"
            >
              تعديل
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];