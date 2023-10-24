import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useEmployees } from '@/hooks/useEmployees';
import { useState } from 'react';
import { Filters } from '@/services/getEmployeesService';

export const Employees = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: employees = {
      data: [],
      pagesCount: 0,
    },
    isError,
    isLoading,
  } = useEmployees(filters);

  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <h1>الموظفين</h1>
      <DataTable
        columns={columns}
        data={employees.data}
        setFilters={setFilters}
        filters={{
          ...filters,
          pagesCount: employees.pagesCount,
        }}
      />
    </AppLayout>
  );
};
