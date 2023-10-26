import { AppLayout } from '@/components/AppLayout';
import { useOrders } from '@/hooks/useOrders';
import { Filters } from '@/services/getEmployeesService';
import { useState } from 'react';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';

export const OrdersScreen = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: orders = {
      data: [],
      pagesCount: 0,
    },
    isError,
    isLoading,
  } = useOrders(filters);
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <DataTable
        navigationURL="/orders"
        columns={columns}
        data={orders.data}
        setFilters={setFilters}
        filters={{
          ...filters,
          pagesCount: orders.pagesCount,
        }}
      />
    </AppLayout>
  );
};
