import { IDeliveryAgentManifest } from '@/services/getDeliveryAgentManifest';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IDeliveryAgentManifest>[] = [
  {
    accessorKey: 'name',
    header: 'اسم المندوب',
  },
  {
    accessorKey: 'ordersCount',
    header: 'عدد الطلبيات',
  },
];
