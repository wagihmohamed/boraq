import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Order } from '@/services/getOrders';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { DeleteOrder } from './components/DeleteOrder';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'receiptNumber',
    header: 'رقم الفاتورة',
  },
  {
    accessorKey: 'recipientName',
    header: 'اسم المستلم',
  },
  {
    accessorKey: 'recipientPhone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'recipientAddress',
    header: 'العنوان',
  },
  {
    accessorKey: 'totalCost',
    header: 'المبلغ',
  },
  {
    accessorKey: 'paidAmount',
    header: 'المبلغ المدفوع',
  },
  {
    accessorKey: 'totalCostInUSD',
    header: 'المبلغ بالدولار',
  },
  {
    accessorKey: 'paidAmountInUSD',
    header: 'المبلغ المدفوع بالدولار',
  },
  {
    accessorKey: 'discount',
    header: 'الخصم',
  },
  {
    accessorKey: 'quantity',
    header: 'الكمية',
  },
  {
    accessorKey: 'weight',
    header: 'الوزن',
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status }) => {
      return orderStatusArabicNames[status];
    },
  },
  {
    accessorKey: 'deliveryType',
    header: 'نوع التوصيل',
    accessorFn: ({ deliveryType }) => {
      return deliveryTypesArabicNames[deliveryType];
    },
  },
  {
    accessorKey: 'governorate',
    header: 'المحافظة',
    accessorFn: ({ governorate }) => {
      return governorateArabicNames[governorate];
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const { receiptNumber, id } = row.original;
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
              to={`/employees/${receiptNumber}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/employees/${receiptNumber}/edit`}
            >
              تعديل
            </Link>
            <DeleteOrder id={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
