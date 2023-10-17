import { Employee } from '@/services/getEmployeesService';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteEmployee } from './DeleteEmployee';
import { Link } from 'react-router-dom';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'username',
    header: 'اسم المستخدم',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'role',
    header: 'الوظيفة',
    accessorFn: ({ role }) => {
      return rolesArabicNames[role];
    },
  },
  {
    accessorKey: 'branch',
    header: 'الفرع',
    accessorFn: ({ branch }) => {
      return branch?.name ?? 'لا يوجد';
    },
  },
  {
    accessorKey: 'repository',
    header: 'المخزن',
    accessorFn: ({ repository }) => {
      return repository?.name ?? 'لا يوجد';
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original;
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
              to={`/employees/${employee.id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/employees/${employee.id}/edit`}
            >
              تعديل
            </Link>
            <DeleteEmployee id={employee.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
