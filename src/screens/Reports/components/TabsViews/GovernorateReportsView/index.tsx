import { DataTable } from '@/screens/Employees/data-table';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { Divider, LoadingOverlay } from '@mantine/core';
import { columns } from './columns';
import { ReportsStatistics } from '../../ReportsStatistics';
import { GovernorateOrdersFilters } from './GovernorateOrders';
import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { ordersFilterInitialState } from '@/screens/Orders';
import { useOrders } from '@/hooks/useOrders';
import { GovernorateOrdersStatistics } from './GovernorateOrdersStatistics';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { reportsOrdersColumns } from '../reportsOrdersColumns';

export const GovernorateReportsView = () => {
  const [governorateFilter, setGovernorateFilter] = useState<OrdersFilter>({
    ...ordersFilterInitialState,
    governorate_report: '0',
  });
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
    type: 'GOVERNORATE',
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
  } = useOrders(governorateFilter, !!governorateFilter.governorate);

  return (
    <>
      <GovernorateOrdersFilters
        governorateFilter={governorateFilter}
        setGovernorateFilter={setGovernorateFilter}
        reportsFilters={filters}
        setReportsFilters={setFilters}
      />
      <div className="relative mt-12 mb-12">
        <p className="text-center -mb-5 md:text-3xl text-2xl">الطلبات</p>
        <LoadingOverlay visible={isOrdersInitialLoading} />
        <DataTable
          columns={reportsOrdersColumns}
          data={orders.data.orders}
          setFilters={setGovernorateFilter}
          filters={{
            ...setGovernorateFilter,
            pagesCount: governorateFilter.pagesCount,
          }}
        />
        <GovernorateOrdersStatistics
          governorate={
            governorateFilter.governorate as keyof typeof governorateArabicNames
          }
          orders={orders.data.orders}
          ordersMetaData={orders.data.ordersMetaData}
        />
      </div>
      <Divider my="md" size="md" color="red" />
      <Divider my="md" size="md" color="red" />
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
