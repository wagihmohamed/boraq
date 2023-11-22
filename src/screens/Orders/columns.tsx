/* eslint-disable react-hooks/rules-of-hooks */
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
import { ActionIcon, Checkbox, HoverCard, Text, rem } from '@mantine/core';
import { IconFileTypePdf } from '@tabler/icons-react';
import { useOrderReceipt } from '@/hooks/useOrderReceipt';
import toast from 'react-hot-toast';
import { useOrdersStore } from '@/store/ordersStore';

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
      const { id, recipientName } = row.original;
      const { mutateAsync: getReceipt } = useOrderReceipt(recipientName);

      const handleDownload = () => {
        toast.promise(getReceipt([id]), {
          loading: 'جاري تحميل الفاتورة...',
          success: 'تم تحميل الفاتورة بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

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
              to={`/orders/${id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/orders/${id}/edit`}
            >
              تعديل
            </Link>
            <div className="flex justify-center">
              <HoverCard width={rem(120)} shadow="md">
                <HoverCard.Target>
                  <ActionIcon variant="filled" onClick={handleDownload}>
                    <IconFileTypePdf />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">تحميل الفاتورة</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
