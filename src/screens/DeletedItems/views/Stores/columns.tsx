import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Store } from '@/services/getStores';
import { Avatar } from '@mantine/core';
import { IMAGE_BASE_URL } from '@/api';
import { PermanentlyDeleteStore } from './PermanentlyDeleteStore';
import { format, parseISO } from 'date-fns';

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: 'logo',
    header: 'الصورة',
    cell: ({ row }) => {
      const { logo } = row.original;
      return <Avatar src={IMAGE_BASE_URL + logo} radius="xl" size="lg" />;
    },
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'client.name',
    header: 'العميل',
    cell: ({ row }) => {
      const { client } = row.original;
      return (
        <Link
          to={`/clients/${client.id}/show`}
          className={buttonVariants({
            variant: 'link',
            className: 'text-primary-foreground underline',
          })}
        >
          {client.name}
        </Link>
      );
    },
  },
  {
    accessorKey: 'deletedAt',
    header: 'تاريخ الحذف',
    cell: ({ row }) => {
      const { deletedAt } = row.original;
      if (deletedAt) {
        return format(parseISO(deletedAt), 'dd/MM/yyyy HH:mm');
      }
      return '';
    },
  },
  {
    accessorKey: 'deletedBy.name',
    header: 'تم الحذف بواسطة',
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
            <PermanentlyDeleteStore />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
