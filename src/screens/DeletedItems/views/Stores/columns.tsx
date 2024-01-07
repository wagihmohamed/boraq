import { ColumnDef } from '@tanstack/react-table';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Store } from '@/services/getStores';
import { ActionIcon, Avatar } from '@mantine/core';
import { PermanentlyDeleteStore } from './PermanentlyDeleteStore';
import { format, parseISO } from 'date-fns';
import { useActivateStore } from '@/hooks/useActivateStore';
import { IconRotate } from '@tabler/icons-react';

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: 'logo',
    header: 'الصورة',
    cell: ({ row }) => {
      const { logo } = row.original;
      return <Avatar src={logo} radius="xl" size="lg" />;
    },
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'client.name',
    header: 'العميل',
    cell: ({ row }) => {
      const { client } = row.original;
      return (
        <Link
          to={`/clients/${client.id}/show`}
          className={buttonVariants({
            variant: 'link',
            className: 'text-primary-foreground underline',
          })}
        >
          {client.name}
        </Link>
      );
    },
  },
  {
    accessorKey: 'deletedAt',
    header: 'تاريخ الحذف',
    cell: ({ row }) => {
      const { deletedAt } = row.original;
      if (deletedAt) {
        return format(parseISO(deletedAt), 'dd/MM/yyyy HH:mm');
      }
      return '';
    },
  },
  {
    accessorKey: 'deletedBy.name',
    header: 'تم الحذف بواسطة',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate: activate } = useActivateStore();

      const handleActivate = () => {
        activate(id);
      };
      return (
        <div className="flex justify-center gap-5">
          <PermanentlyDeleteStore id={id} />
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
