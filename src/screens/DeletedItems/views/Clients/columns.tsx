import { ColumnDef } from '@tanstack/react-table';
import { ActionIcon, Avatar, Badge } from '@mantine/core';
import { Client } from '@/services/getClients';
import { PermanentlyDeleteOrder } from './PermanentlyDeleteOrder';
import { IMAGE_BASE_URL } from '@/api';
import { useActivateClient } from '@/hooks/useActivateClient';
import { IconRotate } from '@tabler/icons-react';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'avatar',
    header: 'الصورة',
    cell: ({ row }) => {
      const { avatar } = row.original;
      return <Avatar src={IMAGE_BASE_URL + avatar} alt="avatar" size="lg" />;
    },
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'branch.name',
    header: 'الفرع',
    cell: ({ row }) => {
      const { branch } = row.original;
      return <div>{branch?.name || 'لا يوجد'}</div>;
    },
  },
  {
    accessorKey: 'company.name',
    header: 'الشركة',
  },
  {
    accessorKey: 'phone',
    header: 'رقم الهاتف',
  },
  {
    accessorKey: 'role',
    header: 'نوع الحساب',
    cell: ({ row }) => {
      const { role } = row.original;
      return (
        <div>
          {role === 'CLIENT' ? (
            <Badge>عميل</Badge>
          ) : (
            <Badge color="red">مساعد عميل</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate: activate } = useActivateClient();

      const handleActivate = () => {
        activate(id);
      };
      return (
        <div className="flex justify-center gap-5">
          <PermanentlyDeleteOrder clientId={id} />
          <ActionIcon
            variant="filled"
            onClick={handleActivate}
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
