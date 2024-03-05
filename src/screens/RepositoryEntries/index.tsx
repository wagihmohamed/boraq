import { AppLayout } from '@/components/AppLayout';
import { DataTable } from '../Employees/data-table';
import { columns } from './components/columns';
import { RepositoryEntriesFilters } from './components/RepositoryEntriesFilters';
import { useState } from 'react';
import { OrdersFilter } from '@/services/getOrders';
import { ordersFilterInitialState } from '../Orders';
import { useOrders } from '@/hooks/useOrders';
import { LoadingOverlay } from '@mantine/core';

export const RepositoryEntries = () => {
  const [filters, setFilters] = useState<OrdersFilter>(
    ordersFilterInitialState
  );

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
    statuses: ['RETURNED', 'PARTIALLY_RETURNED', 'REPLACED'],
  });

  return (
    <AppLayout isError={isError}>
      <RepositoryEntriesFilters />
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
