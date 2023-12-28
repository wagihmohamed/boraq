import { AppLayout } from '@/components/AppLayout';
import { useAutomaticUpdates } from '@/hooks/useAutomaticUpdates';
import { LoadingOverlay } from '@mantine/core';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';
import { useState } from 'react';
import { Filters } from '@/services/getEmployeesService';
import { AddAutomaticUpdateTimer } from './components/AddAutomaticUpdateTimer';

export const OrdersAutoUpdate = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const { data: automaticUpdatesData, isInitialLoading } =
    useAutomaticUpdates(filters);

  return (
    <AppLayout>
      <AddAutomaticUpdateTimer />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          navigationURL="/orders/add"
          columns={columns}
          data={automaticUpdatesData?.data || []}
          setFilters={setFilters}
          filters={{
            ...filters,
            pagesCount: automaticUpdatesData?.pagesCount,
          }}
        />
      </div>
    </AppLayout>
  );
};
