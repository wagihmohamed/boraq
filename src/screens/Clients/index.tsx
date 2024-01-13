import { AppLayout } from '@/components/AppLayout';
import { columns } from './columns';
import { useClients } from '@/hooks/useClients';
import { DataTable } from '../Employees/data-table';
import { Filters } from '@/services/getEmployeesService';
import { useState } from 'react';
import { useAuth } from '@/store/authStore';

export const ClientsScreen = () => {
  const { role } = useAuth();
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
      <DataTable
        columns={columns}
        data={clients?.data}
        navigationURL={role !== 'SUPER_ADMIN' ? '/clients/add' : ''}
        setFilters={setFilters}
        filters={{
          ...filters,
          pagesCount: clients.pagesCount,
        }}
        navButtonTitle="إضافة عميل"
      />
    </AppLayout>
  );
};
