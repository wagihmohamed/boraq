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
import { DeleteStore } from './delete-store';

export const columns: ColumnDef<Store>[] = [
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
    id: 'actions',
    cell: ({ row }) => {
      const store = row.original;
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
              to={`/stores/${store.id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/stores/${store.id}/edit`}
            >
              تعديل
            </Link>
            <DeleteStore storeId={store.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
