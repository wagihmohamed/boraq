/* eslint-disable react-hooks/rules-of-hooks */
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { orderReturnConditionArabicNames } from '@/lib/orderReturnConditionArabicNames';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { APIError } from '@/models';
import { deleteAutomaticUpdateDateService } from '@/services/deleteAutomaticUpdateDate';
import { AutomaticUpdate } from '@/services/getAutomaticUpdates';
import { ActionIcon, rem } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const columns: ColumnDef<AutomaticUpdate>[] = [
  {
    id: '#',
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'orderStatus',
    header: 'الاسم',
    cell: ({ row }) => {
      return <div>{orderStatusArabicNames[row.original.orderStatus]}</div>;
    },
  },
  {
    accessorKey: 'governorate',
    header: 'المحافظة',
    cell: ({ row }) => {
      return <div>{governorateArabicNames[row.original.governorate]}</div>;
    },
  },
  {
    accessorKey: 'returnCondition',
    header: 'شرط الارجاع',
    cell: ({ row }) => {
      return (
        <div>
          {orderReturnConditionArabicNames[row.original.returnCondition]}
        </div>
      );
    },
  },
  {
    accessorKey: 'updateAt',
    header: 'القيمة بالساعة',
  },
  {
    accessorKey: 'checkAfter',
    header: 'يوميا علي الساعة',
  },
  {
    id: 'action',
    header: 'الحذف',
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { mutate: deleteDate } = useMutation({
        mutationFn: (id: number) => {
          return deleteAutomaticUpdateDateService({ id });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['automaticUpdates'],
          });
          toast.success('تم حذف الموعد بنجاح');
        },
        onError: (error: AxiosError<APIError>) => {
          toast.error(error.response?.data.message || 'حدث خطأ ما');
        },
      });

      const handleDelete = () => {
        deleteDate(row.original.id);
      };

      return (
        <ActionIcon onClick={handleDelete} variant="filled">
          <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
      );
    },
  },
];
