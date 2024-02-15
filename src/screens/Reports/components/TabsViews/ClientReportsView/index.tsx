import { DataTable } from '@/screens/Employees/data-table';
import { useState } from 'react';
import { columns } from './columns';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { Divider, LoadingOverlay } from '@mantine/core';
import { ReportsFilter } from '../../ReportsFilter';
import { ReportsStatistics } from '../../ReportsStatistics';
import { ClientOrdersFilter } from './ClientOrders';
import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { ordersFilterInitialState } from '@/screens/Orders';
import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/screens/Orders/components/OrdersTable';
import { columns as ordersColumns } from '../../../../Orders/columns';
import { ClientOrdersStatistics } from './ClientOrdersStatistics';

export const ClientReportsView = () => {
  const [ordersFilter, setOrdersFilter] = useState<OrdersFilter>(
    ordersFilterInitialState
  );

  const [reportsFilter, setReportFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
    type: 'CLIENT',
  });

  const { data: reports, isInitialLoading: isReportsInitialLoading } =
    useReports(reportsFilter);
  const {
    data: orders = {
      data: {
        orders: [],
        ordersMetaData: {} as OrdersMetaData,
      },
      pagesCount: 0,
    },
    isInitialLoading: isOrdersInitialLoading,
  } = useOrders(ordersFilter, !!ordersFilter.store_id);

  return (
    <>
      <ClientOrdersFilter
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
        <ClientOrdersStatistics
          storeID={ordersFilter.store_id || ''}
          ordersMetaData={orders.data.ordersMetaData}
          orders={orders.data.orders}
        />
      </div>
      <Divider my="md" size="md" color="red" />
      <Divider my="md" size="md" color="red" />
      <ReportsFilter filters={reportsFilter} setFilters={setReportFilters} />
      <ReportsStatistics reportsMetaData={reports?.data?.reportsMetaData} />
      <div className="relative mt-7">
        <LoadingOverlay visible={isReportsInitialLoading} />
        <DataTable
          data={reports?.data?.reports || []}
          columns={columns}
          filters={{
            ...reportsFilter,
            pagesCount: reports?.pagesCount || 0,
          }}
          setFilters={setReportFilters}
        />
      </div>
    </>
  );
};
