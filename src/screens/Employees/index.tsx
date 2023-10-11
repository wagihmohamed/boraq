import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { fakeEmployees } from '@/mockup/employees';

export const Employees = () => {
  return (
    <AppLayout>
      <h1>الموظفين</h1>
      <DataTable columns={columns} data={fakeEmployees} />
    </AppLayout>
  );
};
