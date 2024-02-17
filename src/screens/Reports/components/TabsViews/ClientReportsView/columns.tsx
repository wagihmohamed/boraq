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
import { DeleteReport } from '../../DeleteReport';
import { ChangeReportStatus } from '../../ChangeReportStatus';
import Arabic from 'date-fns/locale/ar-EG';

export const columns: ColumnDef<IReport>[] = [
  {
    accessorKey: 'id',
    header: 'رقم الكشف',
  },
  {
    accessorKey: 'createdBy.name',
    header: 'الناشئ',
  },
  {
    accessorKey: 'clientReport.client.name',
    header: 'العميل',
    accessorFn: ({ clientReport }) => {
      return clientReport?.client.name || '';
    },
  },
  {
    accessorKey: 'clientReport.client.phone',
    header: 'رقم العميل',
    accessorFn: ({ clientReport }) => {
      return clientReport?.client.phone || '';
    },
  },
  {
    accessorKey: 'clientReport.store.name',
    header: 'المتجر',
    accessorFn: ({ clientReport }) => {
      return clientReport?.store.name || '';
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
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status }) => {
      return reportStatusArabicNames[status];
    },
  },
  {
    accessorKey: 'confirm',
    header: 'التأكيد',
    accessorFn: ({ confirm }) => {
      return confirm ? 'تم التأكيد' : 'لم يتم التأكيد';
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'تاريخ الإنشاء',
    accessorFn: ({ createdAt }) => {
      const stringToDate = parseISO(createdAt);
      const formattedDate = format(stringToDate, 'dd/MM/yyyy HH:mm a', {
        locale: Arabic,
      });
      return formattedDate;
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
        status,
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
          error: (error) => error.message || 'حدث خطأ ما',
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
            <ChangeReportStatus initialStatus={status} id={id} />
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
