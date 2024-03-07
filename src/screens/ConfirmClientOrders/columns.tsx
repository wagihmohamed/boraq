/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/services/getOrders';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { ActionIcon, Badge, Checkbox, Flex, Text, rem } from '@mantine/core';
import { useOrdersStore } from '@/store/ordersStore';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useChangeOrderStatus } from '@/hooks/useChangeOrderStatus';
import { useDeactivateOrder } from '@/hooks/useDeactivateOrder';

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
    accessorKey: 'id',
    header: 'رقم الطلب',
  },
  {
    accessorKey: 'client.name',
    header: 'العميل',
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
        <Text truncate maw={rem(200)} size="sm">
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
    accessorKey: 'deliveryCost',
    header: 'أجرة التوصيل',
  },
  {
    accessorKey: 'paidAmount',
    header: 'المبلغ المدفوع',
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status }) => {
      return orderStatusArabicNames[status];
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
      const { mutate: changeOrderConfirmedStatus, isLoading } =
        useChangeOrderStatus();
      const { mutate: deleteLocation, isLoading: isDeletingOrderLoading } =
        useDeactivateOrder();
      const handleChangeOrderStatus = () => {
        changeOrderConfirmedStatus({
          id,
          data: {
            confirmed: true,
          },
        });
      };

      const handleDeleteOrder = () => {
        deleteLocation(id);
      };

      return (
        <div className="flex items-center gap-4">
          <ActionIcon
            variant="filled"
            color="teal"
            disabled={isLoading || isDeletingOrderLoading}
            onClick={handleChangeOrderStatus}
          >
            <IconCheck />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            disabled={isDeletingOrderLoading || isLoading}
            onClick={handleDeleteOrder}
          >
            <IconX />
          </ActionIcon>
        </div>
      );
    },
  },
];
