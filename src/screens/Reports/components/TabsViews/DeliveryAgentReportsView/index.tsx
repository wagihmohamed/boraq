import { DataTable } from '@/screens/Employees/data-table';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { Divider, LoadingOverlay } from '@mantine/core';
import { ReportsFilter } from '../../ReportsFilter';
import { columns } from './columns';
import { ReportsStatistics } from '../../ReportsStatistics';
import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { ordersFilterInitialState } from '@/screens/Orders';
import { useOrders } from '@/hooks/useOrders';
import { DeliveryAgentStatistics } from './DeliveryAgentStatistics';
import { OrdersTable } from '@/screens/Orders/components/OrdersTable';
import { columns as ordersColumns } from '../../../../Orders/columns';
import { DeliveryAgentOrdersFilter } from './DeliveryAgentOrders';

export const DeliveryAgentReportsView = () => {
  const [ordersFilter, setOrdersFilter] = useState<OrdersFilter>(
    ordersFilterInitialState
  );
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
    type: 'DELIVERY_AGENT',
  });
  const { data: reports, isInitialLoading } = useReports(filters);

  const {
    data: orders = {
      data: {
        orders: [],
        ordersMetaData: {} as OrdersMetaData,
      },
      pagesCount: 0,
    },
    isInitialLoading: isOrdersInitialLoading,
  } = useOrders(ordersFilter, !!ordersFilter.delivery_agent_id);
  return (
    <>
      <DeliveryAgentOrdersFilter
        ordersFilters={ordersFilter}
        setOrdersFilters={setOrdersFilter}
      />
      <div className="relative mt-12 mb-12">
        <p className="text-center -mb-5 md:text-3xl text-2xl">الطلبات</p>
        <LoadingOverlay visible={isOrdersInitialLoading} />
        <OrdersTable
          columns={ordersColumns}
          data={orders.data.orders}
          setFilters={setOrdersFilter}
          filters={{
            ...ordersFilter,
            pagesCount: orders.pagesCount,
          }}
        />
        <DeliveryAgentStatistics
          deliveryAgentID={ordersFilter.delivery_agent_id || ''}
          orders={orders.data.orders}
          ordersMetaData={orders.data.ordersMetaData}
        />
      </div>
      <Divider my="md" size="md" color="red" />
      <Divider my="md" size="md" color="red" />
      <ReportsFilter filters={filters} setFilters={setFilters} />
      <ReportsStatistics reportsMetaData={reports?.data?.reportsMetaData} />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          data={reports?.data?.reports || []}
          columns={columns}
          filters={{
            ...filters,
            pagesCount: reports?.pagesCount || 0,
          }}
          setFilters={setFilters}
        />
      </div>
    </>
  );
};
