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
    accessorKey: 'RepositoryReport',
    header: 'المخزن',
    cell: ({ row }) => {
      const { RepositoryReport } = row.original;
      if (!RepositoryReport) {
        return 'لا يوجد';
      }
      return RepositoryReport.repository.name;
    },
  },
  {
    accessorKey: 'BranchReport',
    header: 'الفرع',
    cell: ({ row }) => {
      const { BranchReport } = row.original;
      if (!BranchReport) {
        return 'لا يوجد';
      }
      return BranchReport.branch.name;
    },
  },
  {
    accessorKey: 'ClientReport',
    header: 'العميل',
    cell: ({ row }) => {
      const { ClientReport } = row.original;
      if (!ClientReport) {
        return 'لا يوجد';
      }
      return ClientReport.client.name;
    },
  },
  {
    accessorKey: 'GovernorateReport',
    header: 'المحافظة',
    cell: ({ row }) => {
      const { GovernorateReport } = row.original;
      if (!GovernorateReport) {
        return 'لا يوجد';
      }
      return governorateArabicNames[GovernorateReport.governorate];
    },
  },
  {
    accessorKey: 'DeliveryAgentReport',
    header: 'المندوب',
    cell: ({ row }) => {
      const { DeliveryAgentReport } = row.original;
      if (!DeliveryAgentReport) {
        return 'لا يوجد';
      }
      return DeliveryAgentReport.deliveryAgent.name;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const {
        id,
        BranchReport,
        ClientReport,
        DeliveryAgentReport,
        GovernorateReport,
        RepositoryReport,
        type,
      } = row.original;

      const reportNameMap: Record<IReport['type'], string> = {
        REPOSITORY: RepositoryReport?.repository.name || '',
        BRANCH: BranchReport?.branch.name || '',
        CLIENT: ClientReport?.client.name || '',
        DELIVERY_AGENT: DeliveryAgentReport?.deliveryAgent.name || '',
        GOVERNORATE:
          (GovernorateReport &&
            governorateArabicNames[GovernorateReport?.governorate]) ||
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
          error: 'فشل في تحميل الكشف',
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
