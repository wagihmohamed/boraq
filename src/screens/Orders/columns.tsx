/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Order } from '@/services/getOrders';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { ActionIcon, Checkbox, HoverCard, Text, rem } from '@mantine/core';
import { IconFileTypePdf } from '@tabler/icons-react';
import { useOrderReceipt } from '@/hooks/useOrderReceipt';
import toast from 'react-hot-toast';
import { useOrdersStore } from '@/store/ordersStore';
import { DeleteOrder } from './components/DeleteOrder';
import { useReportsPDF } from '@/hooks/useReportsPDF';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const { deleteAllOrders, setAllOrders, isOrderExist } = useOrdersStore();

      return (
        <Checkbox
          checked={
            table.getRowModel().rows.length > 0 &&
            table
              .getRowModel()
              .rows.every((row) => isOrderExist(row.original.id.toString()))
          }
          onChange={(event) => {
            const allTableRowsIds = table.getRowModel().rows.map((row) => ({
              id: row.original.id.toString(),
              name: row.original.recipientName,
            }));

            const isAllSelected = event.currentTarget.checked;

            if (isAllSelected) {
              setAllOrders(allTableRowsIds);
              table.toggleAllPageRowsSelected(true);
            } else {
              table.toggleAllPageRowsSelected(false);
              deleteAllOrders();
            }
          }}
        />
      );
    },
    cell: ({ row }) => {
      const { addOrder, deleteOrder, isOrderExist } = useOrdersStore();
      return (
        <Checkbox
          checked={isOrderExist(row.original.id.toString())}
          onChange={(value) => {
            const isChecked = value.currentTarget.checked;
            const { id, recipientName } = row.original;
            if (isChecked) {
              addOrder({ id: id.toString(), name: recipientName });
              row.toggleSelected(true);
            } else {
              row.toggleSelected(false);
              deleteOrder(id.toString());
            }
          }}
        />
      );
    },
  },
  {
    accessorKey: 'receiptNumber',
    header: 'رقم الفاتورة',
  },
  {
    accessorKey: 'recipientName',
    header: 'اسم المستلم',
  },
  {
    accessorKey: 'recipientPhone',
    header: 'رقم الهاتف',
  },
  {
    header: 'العنوان',
    cell: ({ row }) => {
      const { recipientAddress, governorate } = row.original;
      return (
        <Text size="sm">
          {governorateArabicNames[governorate]} - {recipientAddress}
        </Text>
      );
    },
  },
  {
    accessorKey: 'totalCost',
    header: 'المبلغ',
  },
  {
    accessorKey: 'paidAmount',
    header: 'المبلغ المدفوع',
  },
  {
    accessorKey: 'companyNet',
    header: 'صافي الشركة',
    cell: ({ row }) => {
      const { companyNet } = row.original;
      return (
        <Text dir={Number(companyNet) > 0 ? 'rtl' : 'ltr'} size="sm">
          {companyNet}
        </Text>
      );
    },
  },
  {
    accessorKey: 'clientNet',
    header: 'صافي العميل',
    cell: ({ row }) => {
      const { clientNet } = row.original;
      return (
        <Text dir={Number(clientNet) > 0 ? 'rtl' : 'ltr'} size="sm">
          {clientNet}
        </Text>
      );
    },
  },
  {
    accessorKey: 'deliveryAgent.deliveryCost',
    header: 'صافي المندوب',
  },
  {
    accessorKey: 'deliveryCost',
    header: 'تكلفة التوصيل',
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    accessorFn: ({ status }) => {
      return orderStatusArabicNames[status];
    },
  },
  {
    accessorKey: 'deliveryType',
    header: 'نوع التوصيل',
    accessorFn: ({ deliveryType }) => {
      return deliveryTypesArabicNames[deliveryType];
    },
  },
  {
    accessorKey: 'clientReport',
    header: 'كشف عميل',
    cell: ({ row }) => {
      const { clientReport } = row.original;
      const { mutateAsync: getReportPDF } = useReportsPDF('كشف عميل');

      const handleDownload = () => {
        if (!clientReport) return;
        toast.promise(getReportPDF(clientReport.reportId), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      if (!clientReport) return 'لا يوجد';
      return (
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
      );
    },
  },
  {
    accessorKey: 'branchReport',
    header: 'كشف فرع',
    cell: ({ row }) => {
      const { branchReport } = row.original;
      const { mutateAsync: getReportPDF } = useReportsPDF('كشف فرع');

      const handleDownload = () => {
        if (!branchReport) return;
        toast.promise(getReportPDF(branchReport.reportId), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      if (!branchReport) return 'لا يوجد';
      return (
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
      );
    },
  },
  {
    accessorKey: 'deliveryAgentReport',
    header: 'كشف مندوب',
    cell: ({ row }) => {
      const { deliveryAgentReport } = row.original;
      const { mutateAsync: getReportPDF } = useReportsPDF('كشف مندوب');

      const handleDownload = () => {
        if (!deliveryAgentReport) return;
        toast.promise(getReportPDF(deliveryAgentReport.reportId), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      if (!deliveryAgentReport) return 'لا يوجد';
      return (
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
      );
    },
  },
  {
    accessorKey: 'repositoryReport',
    header: 'كشف مخزن',
    cell: ({ row }) => {
      const { repositoryReport } = row.original;
      const { mutateAsync: getReportPDF } = useReportsPDF('كشف مخزن');

      const handleDownload = () => {
        if (!repositoryReport) return;
        toast.promise(getReportPDF(repositoryReport.reportId), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      if (!repositoryReport) return 'لا يوجد';
      return (
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
      );
    },
  },
  {
    accessorKey: 'branchReport',
    header: 'كشف فرع',
    cell: ({ row }) => {
      const { branchReport } = row.original;
      const { mutateAsync: getReportPDF } = useReportsPDF('كشف فرع');

      const handleDownload = () => {
        if (!branchReport) return;
        toast.promise(getReportPDF(branchReport.reportId), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      if (!branchReport) return 'لا يوجد';
      return (
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
      );
    },
  },
  {
    accessorKey: 'governorateReport',
    header: 'كشف محافظة',
    cell: ({ row }) => {
      const { governorateReport } = row.original;
      const { mutateAsync: getReportPDF } = useReportsPDF('كشف محافظة');

      const handleDownload = () => {
        if (!governorateReport) return;
        toast.promise(getReportPDF(governorateReport.reportId), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      if (!governorateReport) return 'لا يوجد';
      return (
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
      );
    },
  },
  {
    accessorKey: 'companyReport',
    header: 'كشف شركة',
    cell: ({ row }) => {
      const { companyReport } = row.original;
      const { mutateAsync: getReportPDF } = useReportsPDF('كشف شركة');

      const handleDownload = () => {
        if (!companyReport) return;
        toast.promise(getReportPDF(companyReport.reportId), {
          loading: 'جاري تحميل الكشف...',
          success: 'تم تحميل الكشف بنجاح',
          error: (error) => error.response?.data.message || 'حدث خطأ ما',
        });
      };

      if (!companyReport) return 'لا يوجد';
      return (
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
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, recipientName } = row.original;
      const { mutateAsync: getReceipt } = useOrderReceipt(recipientName);

      const handleDownload = () => {
        toast.promise(getReceipt([id]), {
          loading: 'جاري تحميل الفاتورة...',
          success: 'تم تحميل الفاتورة بنجاح',
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
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/orders/${id}/show`}
            >
              عرض
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full',
              })}
              to={`/orders/${id}/edit`}
            >
              تعديل
            </Link>
            <DeleteOrder id={id} />
            <div className="flex justify-center">
              <HoverCard width={rem(120)} shadow="md">
                <HoverCard.Target>
                  <ActionIcon variant="filled" onClick={handleDownload}>
                    <IconFileTypePdf />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">تحميل الفاتورة</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
