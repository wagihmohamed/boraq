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
import { Client } from '@/services/getClients';
import { DeleteClient } from './delete-client';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'branch.name',
    header: 'الفرع',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'accountType',
    header: 'نوع الحساب',
    cell: ({ row }) => {
      const { accountType } = row.original;
      return (
        <div>
          {accountType === 'CLIENT' ? (
            <Badge>عميل</Badge>
          ) : (
            <Badge color="red">مساعد عميل</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
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
              to={`/clients/${id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/clients/${id}/edit`}
            >
              تعديل
            </Link>
            <DeleteClient clientId={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
