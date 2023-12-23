/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/rules-of-hooks */
import { IDeliveryAgentManifest } from '@/services/getDeliveryAgentManifest';
import { useManifestStore } from '@/store/manifestStore';
import { Button } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

export const columns: ColumnDef<IDeliveryAgentManifest>[] = [
  {
    accessorKey: 'name',
    header: 'اسم المندوب',
  },
  {
    accessorKey: 'ordersCount',
    header: 'عدد الطلبيات',
  },
  {
    id: 'ordersPageLink',
    header: 'الطلبيات',
    cell: ({ row }) => {
      const { id } = row.original;
      const navigation = useNavigate();
      const { orders_end_date, orders_start_date, branch_id } =
        useManifestStore();
      const handleClick = () => {
        navigation(`/orders`, {
          state: {
            delivery_agent_id: id,
            orders_end_date,
            orders_start_date,
            branch_id,
          },
        });
      };
      return <Button onClick={handleClick}>عرض الطلبيات</Button>;
    },
  },
];
