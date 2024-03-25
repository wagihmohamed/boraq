/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/services/getOrders';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { ActionIcon, Badge, Checkbox, Flex, Text, rem } from '@mantine/core';
import { useOrdersStore } from '@/store/ordersStore';
import { DeleteOrder } from '../Orders/components/DeleteOrder';
import { useDisclosure } from '@mantine/hooks';
import { OrdersBadge } from '@/components/OrdersBadge';
import { useEditOrder } from '@/hooks/useEditOrder';
import { IconRotate } from '@tabler/icons-react';

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
    accessorKey: 'forwardedBy.name',
    header: 'قام باضافتها',
    cell: ({ row }) => {
      const { forwardedBy } = row.original;
      return <Text size="sm">{forwardedBy?.name || ''}</Text>;
    },
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
      const [deleteOpened, { open: openDelete, close: closeDelete }] =
        useDisclosure(false);

      const { mutate: editOrderStatus, isLoading: isEditingOrderLoading } =
        useEditOrder();

      const handleApproveOrder = () => {
        editOrderStatus({
          id,
          data: {
            forwarded: false,
          },
        });
      };

      return (
        <div className="flex justify-center gap-5">
          <DeleteOrder
            closeMenu={() => {}}
            id={id}
            opened={deleteOpened}
            close={closeDelete}
            open={openDelete}
          />
          <ActionIcon
            disabled={isEditingOrderLoading}
            variant="filled"
            onClick={handleApproveOrder}
            color="green"
            aria-label="Settings"
          >
            <IconRotate />
          </ActionIcon>
        </div>
      );
    },
  },
];
