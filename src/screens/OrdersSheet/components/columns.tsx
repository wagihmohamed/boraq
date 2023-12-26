import { ColumnDef } from '@tanstack/react-table';
// eslint-disable-next-line import/no-cycle
import { OrderSheet } from '..';

export const columns: ColumnDef<OrderSheet>[] = [
  {
    id: 'orderNumber',
    accessorKey: 'orderNumber',
    header: 'رقم الاوردر',
  },
  {
    accessorKey: 'city',
    header: 'المدينة',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'رقم الهاتف',
  },
  {
    header: 'ملاحظات',
    accessorKey: 'notes',
  },
  {
    accessorKey: 'total',
    header: 'المبلغ',
  },
  {
    accessorKey: 'customerName',
    header: 'اسم العميل',
  },
  {
    accessorKey: 'town',
    header: 'المنطقة',
  },
];
