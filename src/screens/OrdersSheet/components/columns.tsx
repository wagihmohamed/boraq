import { ColumnDef } from '@tanstack/react-table';
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
    cell: ({ row }) => {
      const { total } = row.original;
      const formattedNumber = total
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedNumber;
    },
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
