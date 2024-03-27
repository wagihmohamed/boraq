/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/services/getOrders';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { ActionIcon, Badge, Checkbox, Flex, Text, rem } from '@mantine/core';
import { OrdersBadge } from '@/components/OrdersBadge';
import { useEditOrder } from '@/hooks/useEditOrder';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import { useDeactivateOrder } from '@/hooks/useDeactivateOrder';
import toast from 'react-hot-toast';
import { useForwardedOrdersStore } from '@/store/forwardedOrders';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const { deleteAllOrders, setAllOrders, isOrderExist } =
        useForwardedOrdersStore();

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
      const { addOrder, deleteOrder, isOrderExist } = useForwardedOrdersStore();
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
    accessorKey: 'forwardedBy.name',
    header: 'قام باضافتها',
    cell: ({ row }) => {
      const { forwardedBy } = row.original;
      return <Text size="sm">{forwardedBy?.name || ''}</Text>;
    },
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
      let phoneElement;
      switch (recipientPhones.length) {
        case 0:
          phoneElement = <Text size="sm">لا يوجد</Text>;
          break;
        case 1:
          phoneElement = <Text size="sm">{recipientPhones[0]}</Text>;
          break;
        default:
          phoneElement = (
            <Flex gap="xs">
              <Text size="sm">{recipientPhones[0]}</Text>
              <Badge color="blue" variant="light">
                {recipientPhones.length - 1}
              </Badge>
            </Flex>
          );
          break;
      }

      return phoneElement;
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
    header: 'تكلفة التوصيل',
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => {
      const { status } = row.original;
      return <OrdersBadge status={status} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      const { mutate: deleteOrder, isLoading: isDeleteLoading } =
        useDeactivateOrder();

      const { mutate: editOrderStatus, isLoading: isEditingOrderLoading } =
        useEditOrder();

      const handleDeleteOrder = () => {
        deleteOrder(id, {
          onSuccess: () => {
            toast.success('تم حذف الطلب بنجاح');
          },
        });
      };

      const handleApproveOrder = () => {
        editOrderStatus({
          id,
          data: {
            confirmed: true,
          },
        });
      };

      return (
        <div className="flex justify-center gap-5">
          <ActionIcon
            disabled={isEditingOrderLoading}
            variant="filled"
            onClick={handleApproveOrder}
            color="green"
            aria-label="Settings"
          >
            <IconCheck />
          </ActionIcon>
          <ActionIcon
            disabled={isDeleteLoading}
            variant="filled"
            onClick={handleDeleteOrder}
            color="red"
            aria-label="delete order"
          >
            <IconTrash />
          </ActionIcon>
        </div>
      );
    },
  },
];
