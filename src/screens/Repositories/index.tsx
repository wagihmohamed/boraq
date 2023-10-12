import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { repositories } from '@/mockup/repositories';

export const RepositoriesScreen = () => {
  return (
    <AppLayout>
      <h1>المستودعات</h1>
      <DataTable columns={columns} data={repositories} />
    </AppLayout>
  );
};
