import { DataTable } from '@/screens/Employees/data-table';
import { useState } from 'react';
import { ReportsFilters } from '@/services/getReports';
import { useReports } from '@/hooks/useReports';
import { LoadingOverlay } from '@mantine/core';
import { ReportsFilter } from '../../ReportsFilter';
import { columns } from './columns';
import { ReportsStatistics } from '../../ReportsStatistics';
import { DeleteAllSelectedRepositoryOrders } from './DeleteAllSelectedRepositoryReports';
import { ChangeReportsPaidStatus } from './ChangeReportsPaidStatus';

export const RepositoryReportsView = () => {
  const [filters, setFilters] = useState<ReportsFilters>({
    page: 1,
    size: 10,
    type: 'REPOSITORY',
  });
  const { data: reports, isInitialLoading } = useReports(filters);

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <DeleteAllSelectedRepositoryOrders />
        <ChangeReportsPaidStatus />
      </div>
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
