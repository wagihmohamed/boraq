import { AppLayout } from '@/components/AppLayout';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';

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
    <AppLayout isLoading={isInitialLoading} isError={isError}>
      <h1>الكشوفات</h1>
      <DataTable
        data={reports.data}
        columns={columns}
        filters={{
          ...filters,
          pagesCount: reports.pagesCount,
        }}
        setFilters={setFilters}
        navigationURL="/reports"
      />
    </AppLayout>
  );
};
