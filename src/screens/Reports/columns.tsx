import { ColumnDef } from '@tanstack/react-table';
// import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Report as IReport } from '@/services/getReports';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { format, parseISO } from 'date-fns';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { ActionIcon, HoverCard, Text, rem } from '@mantine/core';
import { IconFileTypePdf } from '@tabler/icons-react';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReportsPDF } from '@/hooks/useReportsPDF';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { DeleteReport } from './components/DeleteReport';

export const columns: ColumnDef<IReport>[] = [
  {
    accessorKey: 'createdBy.name',
    header: 'الموظف',
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status }) => {
      return reportStatusArabicNames[status];
    },
  },
  {
    accessorKey: 'type',
    header: 'النوع',
    accessorFn: ({ type }) => {
      return reportTypeArabicNames[type];
    },
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
    accessorKey: 'repositoryReport',
    header: 'المخزن',
    cell: ({ row }) => {
      const { repositoryReport } = row.original;
      if (!repositoryReport) {
        return 'لا يوجد';
      }
      return repositoryReport.repository.name;
    },
  },
  {
    accessorKey: 'branchReport',
    header: 'الفرع',
    cell: ({ row }) => {
      const { branchReport } = row.original;
      if (!branchReport) {
        return 'لا يوجد';
      }
      return branchReport.branch.name;
    },
  },
  {
    accessorKey: 'clientReport',
    header: 'العميل',
    cell: ({ row }) => {
      const { clientReport } = row.original;
      if (!clientReport) {
        return 'لا يوجد';
      }
      return clientReport.client.name;
    },
  },
  {
    accessorKey: 'governorateReport',
    header: 'المحافظة',
    cell: ({ row }) => {
      const { governorateReport } = row.original;
      if (!governorateReport) {
        return 'لا يوجد';
      }
      return governorateArabicNames[governorateReport.governorate];
    },
  },
  {
    accessorKey: 'deliveryAgentReport',
    header: 'المندوب',
    cell: ({ row }) => {
      const { deliveryAgentReport } = row.original;
      if (!deliveryAgentReport) {
        return 'لا يوجد';
      }
      return deliveryAgentReport.deliveryAgent.name;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const {
        id,
        branchReport,
        clientReport,
        deliveryAgentReport,
        governorateReport,
        repositoryReport,
        type,
      } = row.original;

      const reportNameMap: Record<IReport['type'], string> = {
        REPOSITORY: repositoryReport?.repository.name || '',
        BRANCH: branchReport?.branch.name || '',
        CLIENT: clientReport?.client.name || '',
        DELIVERY_AGENT: deliveryAgentReport?.deliveryAgent.name || '',
        GOVERNORATE:
          (governorateReport &&
            governorateArabicNames[governorateReport?.governorate]) ||
          '',
        COMPANY: '',
      } as const;

      const pdfTitle = `${reportNameMap[type]} - ${reportTypeArabicNames[type]}`;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutateAsync: getReportPDF } = useReportsPDF(pdfTitle);

      const handleDownload = () => {
        toast.promise(getReportPDF(id), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DeleteReport id={id} />
            <div className="flex justify-center">
              <HoverCard width={rem(120)} shadow="md">
                <HoverCard.Target>
                  <ActionIcon variant="filled" onClick={handleDownload}>
                    <IconFileTypePdf />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">تحميل الكشف</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
