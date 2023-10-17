import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useEmployees } from '@/hooks/useEmployees';

export const Employees = () => {
  const {
    data: employees = {
      data: [],
    },
    isError,
    isLoading,
  } = useEmployees();
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <h1>الموظفين</h1>
      <DataTable columns={columns} data={employees.data} />
    </AppLayout>
  );
};
