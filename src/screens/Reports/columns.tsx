import { ColumnDef } from '@tanstack/react-table';
// import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Report as IReport } from '@/services/getReports';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { format, parseISO } from 'date-fns';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

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
  //   {
  //     id: 'actions',
  //     cell: ({ row }) => {
  //       const { id, recipientName } = row.original;
  //       // eslint-disable-next-line react-hooks/rules-of-hooks
  //       const { mutateAsync: getReceipt } = useOrderReceipt(recipientName);

  //       const handleDownload = () => {
  //         toast.promise(getReceipt(id), {
  //           loading: 'جاري تحميل الفاتورة...',
  //           success: 'تم تحميل الفاتورة بنجاح',
  //           error: 'فشل في تحميل الفاتورة',
  //         });
  //       };

  //       return (
  //         <DropdownMenu dir="rtl">
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="center">
  //             <Link
  //               className={buttonVariants({
  //                 variant: 'ghost',
  //                 className: 'w-full',
  //               })}
  //               to={`/orders/${id}/show`}
  //             >
  //               عرض
  //             </Link>
  //             <Link
  //               className={buttonVariants({
  //                 variant: 'ghost',
  //                 className: 'w-full',
  //               })}
  //               to={`/orders/${id}/edit`}
  //             >
  //               تعديل
  //             </Link>
  //             <div className="flex justify-center">
  //               <HoverCard width={rem(120)} shadow="md">
  //                 <HoverCard.Target>
  //                   <ActionIcon variant="filled" onClick={handleDownload}>
  //                     <IconFileTypePdf />
  //                   </ActionIcon>
  //                 </HoverCard.Target>
  //                 <HoverCard.Dropdown>
  //                   <Text size="sm">تحميل الفاتورة</Text>
  //                 </HoverCard.Dropdown>
  //               </HoverCard>
  //             </div>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
