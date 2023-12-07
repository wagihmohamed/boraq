import { Employee } from '@/services/getEmployeesService';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PermanentlyDeleteReport } from './PermanentlyDeleteReport';
import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { Avatar } from '@mantine/core';
import { IMAGE_BASE_URL } from '@/api';
import { format, parseISO } from 'date-fns';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'avatar',
    header: 'الصورة',
    cell: ({ row }) => {
      const employee = row.original;
      return <Avatar src={IMAGE_BASE_URL + employee.avatar} size="lg" />;
    },
  },
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
    accessorKey: 'deletedAt',
    header: 'تاريخ الحذف',
    accessorFn: ({ deletedAt }) => {
      if (deletedAt) {
        return format(parseISO(deletedAt), 'dd/MM/yyyy HH:mm');
      }
      return 'لا يوجد';
    },
  },
  {
    accessorKey: 'deletedBy.name',
    header: 'محذوف من قبل',
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
            <PermanentlyDeleteReport id={employee.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
