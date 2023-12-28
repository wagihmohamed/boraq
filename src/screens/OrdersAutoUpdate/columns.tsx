import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { orderReturnConditionArabicNames } from '@/lib/orderReturnConditionArabicNames';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { AutomaticUpdate } from '@/services/getAutomaticUpdates';
import { ColumnDef } from '@tanstack/react-table';

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
];
