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
import { ChangeOrdersRepositories } from './components/ChangeOrdersRepositories';
import { DeleteSelectedRepositoryEntriesModal } from './components/DeleteSelectedRepositoryEntriesModal';
import { useRepositoryOrdersStore } from '@/store/repositoryEntriesOrders';
import { SendOrderToRepository } from './components/SendOrderToRepository';

const repositoryEntriesInitialStatuses = [
  'RETURNED',
  'PARTIALLY_RETURNED',
  'REPLACED',
];

export const RepositoryEntries = () => {
  const { deleteAllRepositoryOrders, repositoryOrders } =
    useRepositoryOrdersStore();
  const [filters, setFilters] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    confirmed: true,
    branch_report: undefined,
    client_report: undefined,
    company_report: undefined,
    delivery_agent_report: undefined,
    governorate_report: undefined,
    repository_report: undefined,
  });

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
    statuses: filters.statuses?.length
      ? filters.statuses
      : repositoryEntriesInitialStatuses,
  });

  const { mutateAsync: createGeneralReport, isLoading: isCreatingReport } =
    useCreateReportsDocumentation();
  const { mutateAsync: createReport, isLoading: isCreateReportLoading } =
    useCreateReport();

  const isRepositoryOrdersSelected = repositoryOrders.length;

  const handleCreateGeneralReport = () => {
    toast.promise(
      createGeneralReport(
        {
          type: 'GENERAL',
          ordersIDs: isRepositoryOrdersSelected
            ? repositoryOrders.map((order) => Number(order.id))
            : '*',
          params: {
            ...filters,
            statuses: filters.statuses?.length
              ? filters.statuses
              : repositoryEntriesInitialStatuses,
            search,
          },
        },
        {
          onSuccess: () => deleteAllRepositoryOrders(),
        }
      ),
      {
        loading: 'جاري تحميل تقرير...',
        success: 'تم تحميل تقرير بنجاح',
        error: (error) => error.message || 'حدث خطأ ما',
      }
    );
  };

  const handleCreateReport = (type: 'CLIENT' | 'COMPANY' | 'REPOSITORY') => {
    toast.promise(
      createReport(
        {
          type,
          companyID:
            type === 'COMPANY' ? Number(filters.company_id) : undefined,
          clientID: type === 'CLIENT' ? Number(filters.client_id) : undefined,
          storeID: type === 'CLIENT' ? Number(filters.store_id) : undefined,
          repositoryID:
            type === 'REPOSITORY' ? Number(filters.repository_id) : undefined,
          ordersIDs: isRepositoryOrdersSelected
            ? repositoryOrders.map((order) => Number(order.id))
            : '*',
          params: {
            ...filters,
            statuses: filters.statuses?.length
              ? filters.statuses
              : repositoryEntriesInitialStatuses,
            search,
          },
        },
        {
          onSuccess: () => deleteAllRepositoryOrders(),
        }
      ),
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
        <DeleteSelectedRepositoryEntriesModal />
        <ChangeOrdersRepositories />
        <Button disabled={isCreatingReport} onClick={handleCreateGeneralReport}>
          انشاء تقرير
        </Button>
        <Button
          disabled={isCreateReportLoading}
          onClick={() => {
            if (!filters.company_id) {
              toast.error('يجب اختيار شركة');
              return;
            }
            handleCreateReport('COMPANY');
          }}
        >
          انشاء كشف رواجع للشركة
        </Button>
        <Button
          disabled={isCreateReportLoading}
          onClick={() => {
            if (!filters.store_id) {
              toast.error('يجب اختيار المتجر');
              return;
            }
            handleCreateReport('CLIENT');
          }}
        >
          انشاء كشف رواجع للعميل
        </Button>
        <Button
          disabled={isCreateReportLoading}
          onClick={() => {
            if (!filters.repository_id) {
              toast.error('يجب اختيار مخزن');
              return;
            }
            handleCreateReport('REPOSITORY');
          }}
        >
          انشاء كشف رواجع للمخزن
        </Button>
      </div>
      <RepositoryEntriesFilters
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
      />
      <SendOrderToRepository />
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
