import { AppLayout } from '@/components/AppLayout';
import { DataTable } from '../Employees/data-table';
import { repositoryEntriesMockup } from '@/mockup/repositoryEntriesMockup';
import { columns } from './components/columns';
import { RepositoryEntriesFilters } from './components/RepositoryEntriesFilters';

export const RepositoryEntries = () => {
  return (
    <AppLayout>
      <RepositoryEntriesFilters />
      <DataTable
        filters={{
          pagesCount: 1,
          page: 1,
        }}
        setFilters={() => {}}
        data={repositoryEntriesMockup}
        columns={columns}
      />
    </AppLayout>
  );
};
