import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { fakeBranches } from '@/mockup/fakeBranches';

export const BranchesScreen = () => {
  return (
    <AppLayout>
      <h1>الفروع</h1>
      <DataTable columns={columns} data={fakeBranches} />
    </AppLayout>
  );
};
