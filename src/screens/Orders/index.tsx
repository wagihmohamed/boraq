import { AppLayout } from '@/components/AppLayout';
import { useOrders } from '@/hooks/useOrders';
import { useState } from 'react';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';
import { OrdersFilter } from '@/services/getOrders';
import { LoadingOverlay } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { CustomOrdersFilter } from './components/OrdersFilter';

export const ordersFilterInitialState: OrdersFilter = {
  page: 1,
  size: 10,
  client_id: '',
  delivery_agent_id: '',
  delivery_date: null,
  delivery_type: '',
  end_date: '',
  governorate: '',
  location_id: '',
  pagesCount: 0,
  product_id: '',
  receipt_number: '',
  recipient_address: '',
  recipient_name: '',
  recipient_phone: '',
  search: '',
  sort: '',
  start_date: '',
  status: '',
  store_id: '',
};

export const OrdersScreen = () => {
  const [filters, setFilters] = useState<OrdersFilter>(
    ordersFilterInitialState
  );
  const [search, setSearch] = useDebouncedState('', 300);

  const {
    data: orders = {
      data: [],
      pagesCount: 0,
    },
    isError,
    isInitialLoading,
  } = useOrders({
    ...filters,
    search,
  });

  return (
    <AppLayout isError={isError}>
      <CustomOrdersFilter
        filters={filters}
        search={search}
        setFilters={setFilters}
        setSearch={setSearch}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
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
      </div>
    </AppLayout>
  );
};
