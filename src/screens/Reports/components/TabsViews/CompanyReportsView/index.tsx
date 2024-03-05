import { DataTable } from '@/screens/Employees/data-table';
import { useState } from 'react';
import { columns } from './columns';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { Divider, LoadingOverlay } from '@mantine/core';
import { ReportsStatistics } from '../../ReportsStatistics';
import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { ordersFilterInitialState } from '@/screens/Orders';
import { useOrders } from '@/hooks/useOrders';
import { CompanyOrdersFilter } from './CompanyOrders';
import { OrdersTable } from '@/screens/Orders/components/OrdersTable';
import { CompanyOrdersStatistics } from './CompanyOrdersStatistics';
import { reportsOrdersColumns } from '../reportsOrdersColumns';

export const CompanyReportsView = () => {
  const [ordersFilter, setOrdersFilter] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    company_report: '0',
  });
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
    type: 'COMPANY',
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
  } = useOrders({
    ...ordersFilter,
    statuses: ['DELIVERED', 'PARTIALLY_RETURNED', 'REPLACED'],
  });

  return (
    <>
      <CompanyOrdersFilter
        ordersFilters={ordersFilter}
        setOrdersFilters={setOrdersFilter}
        reportsFilters={filters}
        setReportsFilters={setFilters}
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
        <CompanyOrdersStatistics
          orders={orders.data.orders}
          ordersMetaData={orders.data.ordersMetaData}
        />
      </div>
      <Divider my="md" size="md" color="red" />
      <Divider my="md" size="md" color="red" />
      {/* <ReportsFilter filters={filters} setFilters={setFilters} /> */}
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
