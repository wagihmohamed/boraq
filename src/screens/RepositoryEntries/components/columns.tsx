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
import { useRepositoryOrdersStore } from '@/store/repositoryEntriesOrders';
import { Badge, Checkbox, Flex, Text, rem } from '@mantine/core';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { orderSecondaryStatusArabicNames } from '@/lib/orderSecondaryStatusArabicNames';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const {
        deleteAllRepositoryOrders,
        setAllRepositoryOrders,
        isRepositoryOrderExist,
      } = useRepositoryOrdersStore();

      return (
        <Checkbox
          checked={
            table.getRowModel().rows.length > 0 &&
            table
              .getRowModel()
              .rows.every((row) =>
                isRepositoryOrderExist(row.original.id.toString())
              )
          }
          onChange={(event) => {
            const allTableRowsIds = table.getRowModel().rows.map((row) => ({
              id: row.original.id.toString(),
              name: row.original.recipientName,
            }));

            const isAllSelected = event.currentTarget.checked;

            if (isAllSelected) {
              setAllRepositoryOrders(allTableRowsIds);
              table.toggleAllPageRowsSelected(true);
            } else {
              table.toggleAllPageRowsSelected(false);
              deleteAllRepositoryOrders();
            }
          }}
        />
      );
    },
    cell: ({ row }) => {
      const {
        addRepositoryOrder,
        deleteRepositoryOrder,
        isRepositoryOrderExist,
      } = useRepositoryOrdersStore();
      return (
        <Checkbox
          checked={isRepositoryOrderExist(row.original.id.toString())}
          onChange={(value) => {
            const isChecked = value.currentTarget.checked;
            const { id, recipientName } = row.original;
            if (isChecked) {
              addRepositoryOrder({ id: id.toString(), name: recipientName });
              row.toggleSelected(true);
            } else {
              row.toggleSelected(false);
              deleteRepositoryOrder(id.toString());
            }
          }}
        />
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'رقم الطلبية',
  },
  {
    accessorKey: 'receiptNumber',
    header: 'رقم الوصل',
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
    accessorKey: 'deliveryAgent.name',
    header: 'المندوب',
    cell: ({ row }) => {
      const { deliveryAgent } = row.original;
      return <Text size="sm">{deliveryAgent?.name || '--'}</Text>;
    },
  },
  {
    accessorKey: 'client.name',
    header: 'العميل',
  },
  {
    accessorKey: 'store.name',
    header: 'المتجر',
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
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status, secondaryStatus }) => {
      return `${orderStatusArabicNames[status]}  ${
        orderSecondaryStatusArabicNames[secondaryStatus]
          ? ` - ${orderSecondaryStatusArabicNames[secondaryStatus]}`
          : ''
      }`;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
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
              to={`/repositories/${id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/repositories/${id}/edit`}
            >
              تعديل
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
