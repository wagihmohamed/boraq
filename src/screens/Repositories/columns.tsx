import { Repository } from '@/models';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
            {/* <Link
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
            </Link> */}
            {/* <DeleteEmployee /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
