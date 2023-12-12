import { ColumnDef } from '@tanstack/react-table';
import { Report as IReport } from '@/services/getReports';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { format, parseISO } from 'date-fns';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { PermanentlyDeleteReport } from './PermanentlyDeleteReport';
import { ActionIcon } from '@mantine/core';
import { IconRotate } from '@tabler/icons-react';
import { useActivateReport } from '@/hooks/useActivateReport';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';

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
    accessorKey: 'type',
    header: 'النوع',
    accessorFn: ({
      type,
      branchReport,
      clientReport,
      companyReport,
      deliveryAgentReport,
      governorateReport,
      repositoryReport,
    }) => {
      return `${reportTypeArabicNames[type]} - ${(() => {
        switch (type) {
          case 'BRANCH':
            return branchReport?.branch.name;
          case 'CLIENT':
            return clientReport?.client.name;
          case 'COMPANY':
            return companyReport?.company.name;
          case 'DELIVERY_AGENT':
            return deliveryAgentReport?.deliveryAgent.name;
          case 'GOVERNORATE':
            return governorateReport?.governorate
              ? governorateArabicNames[governorateReport.governorate]
              : '';
          case 'REPOSITORY':
            return repositoryReport?.repository.name;
          default:
            return '';
        }
      })()}`;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate: activate } = useActivateReport();

      const handleActivate = () => {
        activate(id);
      };

      return (
        <div className="flex justify-center gap-5">
          <PermanentlyDeleteReport id={id} />
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
