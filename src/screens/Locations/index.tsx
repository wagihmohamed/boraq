import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useLocations } from '@/hooks/useLocations';

export const LocationsScreen = () => {
  const {
    data: locations = {
      data: [],
    },
    isError,
    isLoading,
  } = useLocations();
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <div>المناطق</div>
      <DataTable columns={columns} data={locations.data} />
    </AppLayout>
  );
};
