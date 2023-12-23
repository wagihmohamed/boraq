/* eslint-disable react-hooks/rules-of-hooks */
import { IDeliveryAgentManifest } from '@/services/getDeliveryAgentManifest';
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
    cell: ({ row }) => {
      const { id } = row.original;
      const navigation = useNavigate();
      const handleClick = () => {
        navigation(`/delivery-agents-manifest/${id}`, { state: {} });
      };
      return <Button onClick={handleClick}>actions</Button>;
    },
  },
];
