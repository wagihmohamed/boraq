import { DataTable } from '@/screens/Employees/data-table';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { LoadingOverlay } from '@mantine/core';
import { ReportsFilter } from '../../ReportsFilter';
import { columns } from '../baseReportsColumns';

export const GovernorateReportsView = () => {
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
    type: 'GOVERNORATE',
  });
  const { data: reports, isInitialLoading } = useReports(filters);

  return (
    <>
      <ReportsFilter filters={filters} setFilters={setFilters} />
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
