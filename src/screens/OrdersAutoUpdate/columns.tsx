/* eslint-disable react-hooks/rules-of-hooks */
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { APIError } from '@/models';
import { deleteAutomaticUpdateDateService } from '@/services/deleteAutomaticUpdateDate';
import { AutomaticUpdate } from '@/services/getAutomaticUpdates';
import { ActionIcon, Button, Switch, rem } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { EditAutomaticUpdateTimer } from './components/EditAutomaticUpdateTimer';
import { useEditAutomaticUpdateTimer } from '@/hooks/useEditAutomaticUpdateTimer';
import { useNavigate } from 'react-router-dom';

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
  // {
  //   accessorKey: 'returnCondition',
  //   header: 'شرط الارجاع',
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         {orderReturnConditionArabicNames[row.original.returnCondition]}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: 'checkAfter',
    header: 'التحقق بعد',
  },
  {
    accessorKey: 'enabled',
    header: 'مفعل',
    cell: ({ row }) => {
      const { mutate: editDate, isLoading } = useEditAutomaticUpdateTimer();
      return (
        <Switch
          checked={row.original.enabled}
          disabled={isLoading}
          onChange={(event) => {
            editDate({
              id: row.original.id,
              data: { enabled: event.currentTarget.checked },
            });
          }}
        />
      );
    },
  },
  {
    header: 'السجل',
    cell: ({ row }) => {
      const navigate = useNavigate();

      const handleNavigate = () => {
        navigate('/orders', {
          state: {
            automatic_update_id: row.original.id,
          },
        });
      };
      return (
        <Button onClick={handleNavigate} variant="subtle" size="xs">
          عرض السجل
        </Button>
      );
    },
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
        <div className="flex items-center gap-2">
          <EditAutomaticUpdateTimer {...row.original} />
          <ActionIcon onClick={handleDelete} variant="filled">
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </div>
      );
    },
  },
];
