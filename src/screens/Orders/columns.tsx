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
import { ActionIcon, HoverCard, Text, rem } from '@mantine/core';
import { IconFileTypePdf } from '@tabler/icons-react';
import { useOrderReceipt } from '@/hooks/useOrderReceipt';
import toast from 'react-hot-toast';

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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutateAsync: getReceipt } = useOrderReceipt();

      const handleDownload = () => {
        toast.promise(getReceipt(id), {
          loading: 'جاري تحميل الفاتورة...',
          success: 'تم تحميل الفاتورة بنجاح',
          error: 'فشل في تحميل الفاتورة',
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
