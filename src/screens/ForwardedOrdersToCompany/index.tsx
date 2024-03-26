import { AppLayout } from '@/components/AppLayout';
import { useOrders } from '@/hooks/useOrders';
import { OrdersFilter } from '@/services/getOrders';
import { useAuth } from '@/store/authStore';
import { useDebouncedState } from '@mantine/hooks';
import { useState } from 'react';
import { ordersFilterInitialState } from '../Orders';
import { LoadingOverlay } from '@mantine/core';
import { OrdersTable } from '../Orders/components/OrdersTable';
import { columns } from './columns';
import { ForwardedOrdersToCompanyFilters } from './ForwardedOrdersToCompanyFilters';

export const ForwardedOrdersToCompany = () => {
  const { companyID } = useAuth();
  const [filters, setFilters] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    forwarded: true,
    forwarded_from_id: companyID,
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
  });

  return (
    <AppLayout isError={isError}>
      <ForwardedOrdersToCompanyFilters
        filters={filters}
        search={search}
        setFilters={setFilters}
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
