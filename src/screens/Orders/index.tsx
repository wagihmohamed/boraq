import { AppLayout } from '@/components/AppLayout';
import { useOrders } from '@/hooks/useOrders';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { LoadingOverlay } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { CustomOrdersFilter } from './components/OrdersFilter';
import { OrdersTable } from './components/OrdersTable';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/store/authStore';
import { OrdersStatistics } from './components/OrdersStatistics';

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
  statuses: [],
  status: '',
  store_id: '',
  branch_id: '',
  automatic_update_id: '',
  minified: false,
  confirmed: true,
  branch_report: '0',
  client_report: '0',
  company_report: '0',
  delivery_agent_report: '0',
  governorate_report: '0',
  repository_report: '0',
  processed: '0',
};

interface OrdersSearchParameters {
  delivery_agent_id: string;
  orders_end_date: string;
  orders_start_date: string;
  branch_id: string;
  automatic_update_id: string;
}

export const OrdersScreen = () => {
  const { role } = useAuth();
  const location = useLocation();
  const [filters, setFilters] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    branch_report: undefined,
    client_report: undefined,
    company_report: undefined,
    delivery_agent_report: undefined,
    governorate_report: undefined,
    repository_report: undefined,
    processed: undefined,
  });
  const [search, setSearch] = useDebouncedState('', 300);

  const locationState = location.state as OrdersSearchParameters;

  useEffect(() => {
    if (locationState?.delivery_agent_id) {
      setFilters((prev) => ({
        ...prev,
        delivery_agent_id: locationState?.delivery_agent_id,
      }));
    }
    if (locationState?.orders_end_date) {
      setFilters((prev) => ({
        ...prev,
        end_date: new Date(locationState?.orders_end_date),
      }));
    }
    if (locationState?.orders_start_date) {
      setFilters((prev) => ({
        ...prev,
        start_date: new Date(locationState?.orders_start_date),
      }));
    }
    if (locationState?.automatic_update_id) {
      setFilters((prev) => ({
        ...prev,
        automatic_update_id: locationState?.automatic_update_id,
      }));
    }
  }, [
    locationState?.delivery_agent_id,
    locationState?.orders_end_date,
    locationState?.orders_start_date,
    locationState?.automatic_update_id,
  ]);

  const {
    data: orders = {
      data: {
        orders: [],
        ordersMetaData: {} as OrdersMetaData,
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
        <OrdersStatistics ordersMetaData={orders.data.ordersMetaData} />
        <OrdersTable
          navigationURL={
            // eslint-disable-next-line no-nested-ternary
            role === 'CLIENT'
              ? '/orders-bulk-create'
              : role !== 'ADMIN_ASSISTANT' && role !== 'ADMIN'
              ? '/orders-bulk-create'
              : ''
          }
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
