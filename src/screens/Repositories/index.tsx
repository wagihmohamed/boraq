import { AppLayout } from '@/components/AppLayout';
import { columns } from './columns';
import { useRepositories } from '@/hooks/useRepositories';
import { DataTable } from '../Employees/data-table';
import { Filters } from '@/services/getEmployeesService';
import { useState } from 'react';

export const RepositoriesScreen = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: repositories = {
      data: [],
      pagesCount: 0,
    },
    isLoading,
    isError,
  } = useRepositories(filters);
  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <h1>المستودعات</h1>
      <DataTable
        columns={columns}
        data={repositories?.data}
        navigationURL="/repositories/add"
        setFilters={setFilters}
        filters={{
          ...filters,
          pagesCount: repositories.pagesCount,
        }}
      />
    </AppLayout>
  );
};
