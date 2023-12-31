import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Location } from '@/services/getLocations';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { DeleteLocation } from './delete-location';

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'branch.name',
    header: 'الفرع',
  },
  {
    accessorKey: 'governorate',
    header: 'المحافظة',
    accessorFn: ({ governorate }) => {
      return governorateArabicNames[governorate] ?? 'لا يوجد';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const location = row.original;
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
              to={`/locations/${location.id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/locations/${location.id}/edit`}
            >
              تعديل
            </Link>
            <DeleteLocation id={location.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
