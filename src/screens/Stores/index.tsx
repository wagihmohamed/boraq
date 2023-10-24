import { AppLayout } from '@/components/AppLayout';
import { useStores } from '@/hooks/useStores';
import { Filters } from '@/services/getEmployeesService';
import { useState } from 'react';
import { DataTable } from '../Employees/data-table';
import { columns } from './columns';

export const Stores = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });

  const {
    data: sizes = {
      data: [],
      pagesCount: 0,
      page: 1,
    },
    isLoading,
    isError,
  } = useStores(filters);

  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <DataTable
        data={sizes.data}
        navigationURL="/stores/add"
        columns={columns}
        filters={{
          ...filters,
          pagesCount: sizes.pagesCount,
        }}
        setFilters={setFilters}
      />
    </AppLayout>
  );
};
