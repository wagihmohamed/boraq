import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useRepositories } from '@/hooks/useRepositories';

export const RepositoriesScreen = () => {
  const {
    data: repositories = {
      data: [],
    },
    isLoading,
    isError,
  } = useRepositories();
  return (
    <AppLayout isLoading={isLoading} isError={isError}>
      <h1>المستودعات</h1>
      <DataTable columns={columns} data={repositories?.data} />
    </AppLayout>
  );
};
