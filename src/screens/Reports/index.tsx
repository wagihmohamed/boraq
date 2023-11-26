import { AppLayout } from '@/components/AppLayout';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';
import { ReportsFilter } from './components/ReportsFilter';
import { LoadingOverlay } from '@mantine/core';

export const reportsFilterInitialState: ReportsFilters = {
  page: 1,
  size: 10,
  client_id: '',
  delivery_agent_id: '',
  end_date: '',
  governorate: '',
  pagesCount: 0,
  sort: '',
  start_date: '',
  status: '',
  store_id: '',
};

export const ReportsScreen = () => {
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
  });

  const {
    data: reports = {
      data: [],
      pagesCount: 0,
    },
    isError,
    isInitialLoading,
  } = useReports(filters);

  return (
    <AppLayout isError={isError}>
      <ReportsFilter filters={filters} setFilters={setFilters} />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          data={reports.data}
          columns={columns}
          filters={{
            ...filters,
            pagesCount: reports.pagesCount,
          }}
          setFilters={setFilters}
        />
      </div>
    </AppLayout>
  );
};
