import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from '@mantine/core';
import { Client } from '@/services/getClients';
import { DeleteClient } from './delete-client';
import { EditDeliveryCostsModal } from './EditDeliveryCostsModal';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'avatar',
    header: 'الصورة',
    cell: ({ row }) => {
      const { avatar } = row.original;
      return <Avatar src={avatar} alt="avatar" size="lg" />;
    },
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'branch.name',
    header: 'الفرع',
    cell: ({ row }) => {
      const { branch } = row.original;
      return <div>{branch?.name || 'لا يوجد'}</div>;
    },
  },
  {
    accessorKey: 'company.name',
    header: 'الشركة',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'role',
    header: 'نوع الحساب',
    cell: ({ row }) => {
      const { role } = row.original;
      return (
        <div>
          {role === 'CLIENT' ? (
            <Badge>عميل</Badge>
          ) : (
            <Badge color="red">مساعد عميل</Badge>
          )}
        </div>
      );
    },
  },
  {
    header: 'تكلفة التوصيل',
    cell: ({ row }) => {
      const { id, governoratesDeliveryCosts } = row.original;
      return (
        <EditDeliveryCostsModal
          clientId={id}
          governoratesDeliveryCosts={governoratesDeliveryCosts}
        />
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
