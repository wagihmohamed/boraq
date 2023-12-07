import { ColumnDef } from '@tanstack/react-table';
import { Report as IReport } from '@/services/getReports';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { format, parseISO } from 'date-fns';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { PermanentlyDeleteReport } from './PermanentlyDeleteReport';

export const columns: ColumnDef<IReport>[] = [
  {
    accessorKey: 'createdBy.name',
    header: 'الناشئ',
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status }) => {
      return reportStatusArabicNames[status];
    },
  },
  {
    accessorKey: 'baghdadOrdersCount',
    header: 'عدد الطلبات في بغداد',
  },
  {
    accessorKey: 'governoratesOrdersCount',
    header: 'طلبات المحافظات',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاريخ الإنشاء',
    accessorFn: ({ createdAt }) => {
      const stringToDate = parseISO(createdAt);
      const formatedDate = format(stringToDate, 'dd/MM/yyyy HH:mm');
      return formatedDate;
    },
  },
  {
    accessorKey: 'deletedAt',
    header: 'تاريخ الحذف',
    accessorFn: ({ deletedAt }) => {
      if (deletedAt) {
        const stringToDate = parseISO(deletedAt);
        const formatedDate = format(stringToDate, 'dd/MM/yyyy HH:mm');
        return formatedDate;
      }
      return 'لا يوجد';
    },
  },
  {
    accessorKey: 'deletedBy.name',
    header: 'محذوف من قبل',
  },
  {
    header: 'النوع',
    cell: ({ row }) => {
      const {
        type,
        deliveryAgentReport,
        governorateReport,
        clientReport,
        companyReport,
        branchReport,
        repositoryReport,
      } = row.original;
      if (type === 'DELIVERY_AGENT') {
        return (
          `مندوب - ${deliveryAgentReport?.deliveryAgent.name}` || 'لا يوجد'
        );
      }
      if (type === 'GOVERNORATE' && governorateReport) {
        return (
          `محافظة - ${governorateArabicNames[governorateReport.governorate]}` ||
          'لا يوجد'
        );
      }
      if (type === 'CLIENT') {
        return ` عميل - ${clientReport?.client.name}` || 'لا يوجد';
      }
      if (type === 'COMPANY') {
        return `شركة - ${companyReport?.company.name}` || 'لا يوجد';
      }
      if (type === 'BRANCH') {
        return `فرع - ${branchReport?.branch.name}` || 'لا يوجد';
      }
      if (type === 'REPOSITORY') {
        return `مخزن - ${repositoryReport?.repository.name}` || 'لا يوجد';
      }
      return 'لا يوجد';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <PermanentlyDeleteReport id={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
