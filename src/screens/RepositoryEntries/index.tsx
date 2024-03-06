import { AppLayout } from '@/components/AppLayout';
import { DataTable } from '../Employees/data-table';
import { columns } from './components/columns';
import { RepositoryEntriesFilters } from './components/RepositoryEntriesFilters';
import { useState } from 'react';
import { OrdersFilter } from '@/services/getOrders';
import { ordersFilterInitialState } from '../Orders';
import { useOrders } from '@/hooks/useOrders';
import { Button, LoadingOverlay } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useCreateReportsDocumentation } from '@/hooks/useCreateReportsDocumentation';
import toast from 'react-hot-toast';
import { useCreateReport } from '@/hooks/useCreateReport';
import { useAuth } from '@/store/authStore';

export const RepositoryEntries = () => {
  const { companyID } = useAuth();
  const [filters, setFilters] = useState<OrdersFilter>(
    ordersFilterInitialState
  );

  const [search, setSearch] = useDebouncedState('', 300);

  const {
    data: orders = {
      data: {
        orders: [],
      },
      pagesCount: 0,
    },
    isError,
    isInitialLoading,
  } = useOrders({
    ...filters,
    search,
    statuses: ['RETURNED', 'PARTIALLY_RETURNED', 'REPLACED'],
  });

  const { mutateAsync: createGeneralReport, isLoading: isCreatingReport } =
    useCreateReportsDocumentation();
  const { mutateAsync: createReport, isLoading: isCreateReportLoading } =
    useCreateReport();

  const handleCreateGeneralReport = () => {
    toast.promise(
      createGeneralReport({
        type: 'GENERAL',
        ordersIDs: '*',
        params: {
          ...filters,
          search,
        },
      }),
      {
        loading: 'جاري تحميل تقرير...',
        success: 'تم تحميل تقرير بنجاح',
        error: (error) => error.message || 'حدث خطأ ما',
      }
    );
  };

  const handleCreateReport = (type: 'CLIENT' | 'COMPANY' | 'REPOSITORY') => {
    toast.promise(
      createReport({
        type,
        companyID: type === 'COMPANY' ? Number(companyID) : undefined,
        ordersIDs: '*',
        params: {
          ...filters,
          search,
        },
      }),
      {
        loading: 'جاري تحميل الكشف...',
        success: 'تم تحميل الكشف بنجاح',
        error: (error) => error.message || 'حدث خطأ ما',
      }
    );
  };

  return (
    <AppLayout isError={isError}>
      <div className="flex items-center mb-6 gap-6 flex-wrap">
        <Button disabled={isCreatingReport} onClick={handleCreateGeneralReport}>
          انشاء تقرير
        </Button>
        <Button
          disabled={isCreateReportLoading}
          onClick={() => {
            handleCreateReport('COMPANY');
          }}
        >
          انشاء كشف رواجع للشركة
        </Button>
        <Button
          disabled={isCreateReportLoading}
          onClick={() => {
            if (!filters.client_id) {
              toast.error('يجب اختيار عميل');
              return;
            }
            handleCreateReport('CLIENT');
          }}
        >
          انشاء كشف رواجع للعميل
        </Button>
      </div>
      <RepositoryEntriesFilters
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          filters={filters}
          setFilters={setFilters}
          data={orders.data.orders}
          columns={columns}
        />
      </div>
    </AppLayout>
  );
};
