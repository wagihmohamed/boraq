import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useBranches } from '@/hooks/useBranches';

export const BranchesScreen = () => {
  const {
    data: branches = {
      data: [],
    },
    isLoading,
    isError,
  } = useBranches();
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <h1>الفروع</h1>
      <DataTable columns={columns} data={branches.data} />
    </AppLayout>
  );
};
