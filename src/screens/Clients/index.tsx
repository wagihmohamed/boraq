import { AppLayout } from '@/components/AppLayout';
import { columns } from './columns';
import { useClients } from '@/hooks/useClients';
import { DataTable } from '../Employees/data-table';
import { Filters } from '@/services/getEmployeesService';
import { useState } from 'react';

export const ClientsScreen = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: clients = {
      data: [],
      pagesCount: 0,
    },
    isLoading,
    isError,
  } = useClients(filters);
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <h1>العملاء</h1>
      <DataTable
        columns={columns}
        data={clients?.data}
        navigationURL="/clients/add"
        setFilters={setFilters}
        filters={{
          ...filters,
          pagesCount: clients.pagesCount,
        }}
      />
    </AppLayout>
  );
};
