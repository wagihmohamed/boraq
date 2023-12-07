import { useReports } from '@/hooks/useReports';
import { DataTable } from '@/screens/Employees/data-table';
import { ReportsFilter } from '@/screens/Reports/components/ReportsFilter';
import { ReportsFilters } from '@/services/getReports';
import { LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import { columns } from './columns';

export const DeletedReportsView = () => {
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
    deleted: true,
  });

  const {
    data: reports = {
      data: [],
      pagesCount: 0,
    },
    isInitialLoading,
  } = useReports(filters);

  return (
    <div>
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
    </div>
  );
};
