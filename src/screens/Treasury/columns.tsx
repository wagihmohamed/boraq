import { ColumnDef } from '@tanstack/react-table';
// import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Report as IReport } from '@/services/getReports';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { format, parseISO } from 'date-fns';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { ActionIcon, HoverCard, Text, rem } from '@mantine/core';
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconFileTypePdf,
} from '@tabler/icons-react';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReportsPDF } from '@/hooks/useReportsPDF';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { DeleteReport } from '../Reports/components/DeleteReport';
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
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status }) => {
      return reportStatusArabicNames[status];
    },
  },
  {
    accessorKey: 'clientReport.client.name',
    header: 'اسم العميل',
    accessorFn: ({ clientReport }) => {
      return clientReport?.client.name || '';
    },
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
    accessorKey: 'baghdadOrdersCount',
    header: 'عدد الطلبات في بغداد',
  },
  {
    accessorKey: 'governoratesOrdersCount',
    header: 'طلبات المحافظات',
  },
  {
    header: 'داخل / خارج',
    cell: ({ row }) => {
      const { companyNet } = row.original;

      const isOutcome =
        row.original.governorateReport || row.original.branchReport;

      const renderIcon = isOutcome ? (
        <IconArrowDownLeft
          style={{ width: rem(30), height: rem(30), color: 'red' }}
          stroke={1.5}
        />
      ) : (
        <IconArrowUpRight
          style={{ width: rem(30), height: rem(30), color: 'green' }}
          stroke={1.5}
        />
      );

      return (
        <div className="flex items-center gap-2">
          {renderIcon}
          <Text size="sm" className="mx-2" c={isOutcome ? 'red' : 'green'}>
            {companyNet}
          </Text>
        </div>
      );
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
