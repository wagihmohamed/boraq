import { AppLayout } from '@/components/AppLayout';
import { columns } from './columns';
import { useBranches } from '@/hooks/useBranches';
import { DataTable } from '../Employees/data-table';
import { useState } from 'react';
import { Filters } from '@/services/getEmployeesService';
import { useAuth } from '@/store/authStore';

export const BranchesScreen = () => {
  const { role } = useAuth();
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: branches = {
      data: [],
      pagesCount: 0,
    },
    isLoading,
    isError,
  } = useBranches(filters);
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <DataTable
        columns={columns}
        navigationURL={
          role !== 'ADMIN_ASSISTANT' && role !== 'ADMIN' ? '/branches/add' : ''
        }
        data={branches.data}
        setFilters={setFilters}
        filters={{
          ...filters,
          pagesCount: branches.pagesCount,
        }}
        navButtonTitle="إضافة فرع"
      />
    </AppLayout>
  );
};
