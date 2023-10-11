import { Employee } from '@/models';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'role',
    header: 'الوظيفة',
  },
  {
    accessorKey: 'branch',
    header: 'الفرع',
  },
  {
    accessorKey: 'location',
    header: 'المخزن',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>عرض</DropdownMenuItem>
            <DropdownMenuItem className="my-3">تعديل</DropdownMenuItem>
            <DropdownMenuItem className="bg-destructive ">مسح</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
