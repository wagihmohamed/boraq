import { AppLayout } from '@/components/AppLayout';
import { useOrders } from '@/hooks/useOrders';
import { OrdersFilter } from '@/services/getOrders';
import { useState } from 'react';
import { ordersFilterInitialState } from '../Orders';
import { useDebouncedState } from '@mantine/hooks';
import { OrdersTable } from '../Orders/components/OrdersTable';
import { LoadingOverlay } from '@mantine/core';
import { columns } from './columns';
import { CustomOrdersFilter } from '../Orders/components/OrdersFilter';

// NEW PAGE IN THE COMMENT BELOW
// from our company to other company forwarded:true, forwarded_from_id from the useAuth companyID
export const ForwardedOrders = () => {
  // from other company to our company
  const [filters, setFilters] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    forwarded: true,
    confirmed: false,
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
  });

  return (
    <AppLayout isError={isError}>
      <CustomOrdersFilter
        filters={filters}
        search={search}
        setFilters={setFilters}
        currentPageOrdersIDs={orders.data.orders.map((order) => order.id)}
        setSearch={setSearch}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <OrdersTable
          columns={columns}
          data={orders.data.orders}
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
