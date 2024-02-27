import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { RepositoryEntry } from '@/mockup/repositoryEntriesMockup';

export const columns: ColumnDef<RepositoryEntry>[] = [
  {
    accessorKey: 'id',
    header: 'رقم الطلبية',
  },
  {
    accessorKey: 'receiptNumber',
    header: 'رقم الوصل',
  },
  {
    accessorKey: 'client',
    header: 'العميل',
  },
  {
    accessorKey: 'store',
    header: 'المتجر',
  },
  {
    accessorKey: 'recipientNumber',
    header: 'هاتف المستلم',
  },
  {
    accessorKey: 'recipientAddress',
    header: 'عنوان المستلم',
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
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
              to={`/repositories/${id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/repositories/${id}/edit`}
            >
              تعديل
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
