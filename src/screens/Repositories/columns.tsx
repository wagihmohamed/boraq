import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { DeleteRepository } from './delete-repository';
import { Repository } from '@/services/getRepositoriesservice';

export const columns: ColumnDef<Repository>[] = [
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
              to="/repositories/1/show"
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to="/repositories/1/edit"
            >
              تعديل
            </Link>
            <DeleteRepository />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
