import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useClients } from '@/hooks/useClients';

export const ClientsScreen = () => {
  const {
    data: clients = {
      data: [],
    },
    isLoading,
    isError,
  } = useClients();
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <h1>العملاء</h1>
      <DataTable columns={columns} data={clients?.data} />
    </AppLayout>
  );
};
