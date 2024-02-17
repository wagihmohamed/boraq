/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Order } from '@/services/getOrders';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import {
  ActionIcon,
  Badge,
  Flex,
  HoverCard,
  Menu,
  Text,
  rem,
} from '@mantine/core';
import { IconFileTypePdf } from '@tabler/icons-react';
import { useOrderReceipt } from '@/hooks/useOrderReceipt';
import toast from 'react-hot-toast';
import { DeleteOrder } from '@/screens/Orders/components/DeleteOrder';
import { OrderTimelineModal } from '@/screens/Orders/components/OrderTimelineModal';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ChangeOrderStatus } from '@/screens/Orders/components/ChangeOrderStatus';

export const reportsOrdersColumns: ColumnDef<Order>[] = [
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
    cell: ({ row }) => {
      const { recipientPhones } = row.original;
      return recipientPhones.length > 1 ? (
        <Flex gap="xs">
          <Text size="sm">{recipientPhones[0]}</Text>
          <Badge color="blue" variant="light">
            {recipientPhones.length - 1}
          </Badge>
        </Flex>
      ) : (
        <Text size="sm">لا يوجد</Text>
      );
    },
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
    cell: ({ row }) => {
      const { totalCost } = row.original;
      const formattedNumber = totalCost
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedNumber;
    },
  },
  {
    accessorKey: 'paidAmount',
    header: 'المبلغ المدفوع',
  },
  {
    accessorKey: 'companyNet',
    header: 'صافي الشركة',
    cell: ({ row }) => {
      const { companyNet } = row.original;
      return (
        <Text dir={Number(companyNet) > 0 ? 'rtl' : 'ltr'} size="sm">
          {companyNet}
        </Text>
      );
    },
  },
  {
    accessorKey: 'clientNet',
    header: 'صافي العميل',
    cell: ({ row }) => {
      const { clientNet } = row.original;
      return (
        <Text dir={Number(clientNet) > 0 ? 'rtl' : 'ltr'} size="sm">
          {clientNet}
        </Text>
      );
    },
  },
  {
    accessorKey: 'deliveryAgent.deliveryCost',
    header: 'صافي المندوب',
    cell: ({ row }) => {
      const { deliveryAgent } = row.original;
      return <Text size="sm">{deliveryAgent?.deliveryCost || 0}</Text>;
    },
  },
  {
    accessorKey: 'deliveryCost',
    header: 'تكلفة التوصيل',
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
    id: 'actions',
    cell: ({ row }) => {
      const { id, recipientName, status } = row.original;
      const { mutateAsync: getReceipt } = useOrderReceipt(recipientName);

      const handleDownload = () => {
        toast.promise(getReceipt([id]), {
          loading: 'جاري تحميل الفاتورة...',
          success: 'تم تحميل الفاتورة بنجاح',
          error: (error) => {
            return error.message || 'حدث خطأ ما';
          },
        });
      };
      const [timelineOpened, { open: openTimeline, close: closeTimeline }] =
        useDisclosure(false);
      const [deleteOpened, { open: openDelete, close: closeDelete }] =
        useDisclosure(false);
      const [
        changeStatusOpened,
        { open: openChangeStatus, close: closeChangeStatus },
      ] = useDisclosure(false);

      const [isMenuOpen, setMenuOpen] = useState(false);

      return (
        <Menu
          zIndex={150}
          opened={isMenuOpen}
          onChange={() => {
            if (timelineOpened || deleteOpened || changeStatusOpened) return;
            setMenuOpen(!isMenuOpen);
          }}
        >
          <Menu.Target>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
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
            <DeleteOrder
              id={id}
              opened={deleteOpened}
              close={closeDelete}
              open={openDelete}
            />
            <OrderTimelineModal
              opened={timelineOpened}
              close={closeTimeline}
              open={openTimeline}
              id={id}
            />
            <ChangeOrderStatus
              id={id}
              opened={changeStatusOpened}
              close={closeChangeStatus}
              open={openChangeStatus}
              status={status}
            />
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
          </Menu.Dropdown>
        </Menu>
      );
    },
  },
];
