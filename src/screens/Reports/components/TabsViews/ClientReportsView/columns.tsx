/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { Report as IReport } from '@/services/getReports';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { format, parseISO } from 'date-fns';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { ActionIcon, Checkbox } from '@mantine/core';
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
import { useClientReportStoreStore } from '@/store/useClientReportsStore';

const getReportName = (type: IReport['type'], row: IReport): string => {
  const {
    repositoryReport,
    branchReport,
    clientReport,
    deliveryAgentReport,
    governorateReport,
  } = row;

  switch (type) {
    case 'REPOSITORY':
      return repositoryReport?.repository.name || '';
    case 'BRANCH':
      return branchReport?.branch.name || '';
    case 'CLIENT':
      return clientReport?.client.name || '';
    case 'DELIVERY_AGENT':
      return deliveryAgentReport?.deliveryAgent.name || '';
    case 'GOVERNORATE':
      return (
        (governorateReport &&
          governorateArabicNames[governorateReport?.governorate]) ||
        ''
      );
    case 'COMPANY':
      return '';
    default:
      return '';
  }
};

export const columns: ColumnDef<IReport>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const { deleteAllClientReport, setAllClientReport, isClientReportExist } =
        useClientReportStoreStore();

      return (
        <Checkbox
          checked={
            table.getRowModel().rows.length > 0 &&
            table
              .getRowModel()
              .rows.every((row) =>
                isClientReportExist(row.original.id.toString())
              )
          }
          onChange={(event) => {
            const allTableRowsIds = table.getRowModel().rows.map((row) => ({
              id: row.original.id.toString(),
              name: row.original.clientReport?.client.name || '',
            }));

            const isAllSelected = event.currentTarget.checked;

            if (isAllSelected) {
              setAllClientReport(allTableRowsIds);
              table.toggleAllPageRowsSelected(true);
            } else {
              table.toggleAllPageRowsSelected(false);
              deleteAllClientReport();
            }
          }}
        />
      );
    },
    cell: ({ row }) => {
      const { addClientReport, deleteClientReport, isClientReportExist } =
        useClientReportStoreStore();
      return (
        <Checkbox
          checked={isClientReportExist(row.original.id.toString())}
          onChange={(value) => {
            const isChecked = value.currentTarget.checked;
            const { id, clientReport } = row.original;
            if (isChecked) {
              addClientReport({
                id: id.toString(),
                name: clientReport?.client.name || '',
              });
              row.toggleSelected(true);
            } else {
              row.toggleSelected(false);
              deleteClientReport(id.toString());
            }
          }}
        />
      );
    },
  },
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
      return clientReport?.client?.name || '';
    },
  },
  {
    accessorKey: 'clientReport.client.phone',
    header: 'رقم العميل',
    accessorFn: ({ clientReport }) => {
      return clientReport?.client?.phone || '';
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
    accessorKey: 'clientReport.branch.name',
    header: 'الفرع',
    accessorFn: ({ clientReport }) => {
      return clientReport?.branch?.name || '';
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
    accessorKey: 'clientReport.baghdadDeliveryCost',
    header: 'أجور توصيل بغداد',
  },
  {
    accessorKey: 'clientReport.governoratesDeliveryCost',
    header: 'أجور توصيل المحافظات',
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
    header: 'الملف',
    cell: ({ row }) => {
      const { id, type } = row.original;
      const pdfTitle = getReportName(type, row.original);

      const { mutateAsync: getReportPDF } = useReportsPDF(pdfTitle);

      const handleDownload = () => {
        toast.promise(getReportPDF(id), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.message || 'حدث خطأ ما',
        });
      };
      return (
        <ActionIcon variant="filled" onClick={handleDownload}>
          <IconFileTypePdf />
        </ActionIcon>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, status } = row.original;

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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
