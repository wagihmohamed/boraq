import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { faleClients } from '@/mockup/clients';

export const ClientsScreen = () => {
  return (
    <AppLayout>
      <h1>العملاء</h1>
      <DataTable columns={columns} data={faleClients} />
    </AppLayout>
  );
};
