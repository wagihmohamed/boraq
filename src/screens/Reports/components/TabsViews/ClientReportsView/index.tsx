import { DataTable } from '@/screens/Employees/data-table';
import { useState } from 'react';
import { columns } from './columns';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { Divider, LoadingOverlay } from '@mantine/core';
import { ReportsStatistics } from '../../ReportsStatistics';
import { ClientOrdersFilter } from './ClientOrders';
import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { ordersFilterInitialState } from '@/screens/Orders';
import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/screens/Orders/components/OrdersTable';
import { ClientOrdersStatistics } from './ClientOrdersStatistics';
import { reportsOrdersColumns } from '../reportsOrdersColumns';

export const ClientReportsView = () => {
  const [ordersFilter, setOrdersFilter] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    client_report: '0',
  });

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
  } = useOrders(
    {
      ...ordersFilter,
      statuses: ['DELIVERED', 'PARTIALLY_RETURNED', 'REPLACED'],
    },
    !!ordersFilter.store_id
  );

  return (
    <>
      <ClientOrdersFilter
        ordersFilters={ordersFilter}
        setOrdersFilters={setOrdersFilter}
        reportsFilters={reportsFilter}
        setReportsFilters={setReportFilters}
      />
      <div className="relative mt-12 mb-12">
        <p className="text-center -mb-5 md:text-3xl text-2xl">الطلبات</p>
        <LoadingOverlay visible={isOrdersInitialLoading} />
        <OrdersTable
          columns={reportsOrdersColumns}
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
          ordersLength={orders.data.orders.length}
          ordersParams={ordersFilter}
        />
      </div>
      <Divider my="md" size="md" color="red" />
      <Divider my="md" size="md" color="red" />
      {/* <ReportsFilter filters={reportsFilter} setFilters={setReportFilters} /> */}
      <ReportsStatistics
        params={reportsFilter}
        currentPageReportsIDs={
          reports?.data?.reports.map((report) => report.id) || []
        }
        reportsMetaData={reports?.data?.reportsMetaData}
        tapType="CLIENT"
      />
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
