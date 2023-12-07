/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Order } from '@/services/getOrders';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Checkbox, Text } from '@mantine/core';
import { useOrdersStore } from '@/store/ordersStore';
import { PermanentlyDeleteOrder } from './PermanentlyDeleteOrder';
import { format, parseISO } from 'date-fns';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const { deleteAllOrders, setAllOrders, isOrderExist } = useOrdersStore();

      return (
        <Checkbox
          checked={
            table.getRowModel().rows.length > 0 &&
            table
              .getRowModel()
              .rows.every((row) => isOrderExist(row.original.id.toString()))
          }
          onChange={(event) => {
            const allTableRowsIds = table.getRowModel().rows.map((row) => ({
              id: row.original.id.toString(),
              name: row.original.recipientName,
            }));

            const isAllSelected = event.currentTarget.checked;

            if (isAllSelected) {
              setAllOrders(allTableRowsIds);
              table.toggleAllPageRowsSelected(true);
            } else {
              table.toggleAllPageRowsSelected(false);
              deleteAllOrders();
            }
          }}
        />
      );
    },
    cell: ({ row }) => {
      const { addOrder, deleteOrder, isOrderExist } = useOrdersStore();
      return (
        <Checkbox
          checked={isOrderExist(row.original.id.toString())}
          onChange={(value) => {
            const isChecked = value.currentTarget.checked;
            const { id, recipientName } = row.original;
            if (isChecked) {
              addOrder({ id: id.toString(), name: recipientName });
              row.toggleSelected(true);
            } else {
              row.toggleSelected(false);
              deleteOrder(id.toString());
            }
          }}
        />
      );
    },
  },
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
    header: 'العنوان',
    cell: ({ row }) => {
      const { recipientAddress, governorate } = row.original;
      return (
        <Text size="sm">
          {governorateArabicNames[governorate]} - {recipientAddress}
        </Text>
      );
    },
  },
  {
    accessorKey: 'totalCost',
    header: 'المبلغ',
  },
  {
    accessorKey: 'paidAmountInUSD',
    header: 'المبلغ المدفوع بالدولار',
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
    accessorKey: 'deletedAt',
    header: 'تاريخ الحذف',
    accessorFn: ({ deletedAt }) => {
      if (deletedAt) {
        return format(parseISO(deletedAt), 'yyyy-MM-dd');
      }
      return '';
    },
  },
  {
    accessorKey: 'deletedBy.name',
    header: 'من قبل',
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
            <PermanentlyDeleteOrder />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
