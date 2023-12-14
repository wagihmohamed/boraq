import { useOrders } from '@/hooks/useOrders';
import { useState } from 'react';
import { columns } from './columns';
import { OrdersFilter } from '@/services/getOrders';
import { LoadingOverlay } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { CustomDeletedOrdersFilter } from './CustomDeletedOrdersFilter';
import { OrdersTable } from './OrdersTable';

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
  deleted: true,
  statuses: [],
};

export const DeletedOrdersView = () => {
  const [ordersFilters, setOrdersFilters] = useState<OrdersFilter>(
    ordersFilterInitialState
  );
  const [search, setSearch] = useDebouncedState('', 300);

  const {
    data: orders = {
      data: [],
      pagesCount: 0,
    },
    isInitialLoading,
  } = useOrders({
    ...ordersFilters,
    search,
  });

  return (
    <>
      <CustomDeletedOrdersFilter
        filters={ordersFilters}
        search={search}
        setFilters={setOrdersFilters}
        setSearch={setSearch}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <OrdersTable
          columns={columns}
          data={orders.data}
          setFilters={setOrdersFilters}
          filters={{
            ...ordersFilters,
            pagesCount: orders.pagesCount,
          }}
        />
      </div>
    </>
  );
};
