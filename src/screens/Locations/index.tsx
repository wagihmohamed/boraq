import { AppLayout } from '@/components/AppLayout';
import { columns } from './columns';
import { useLocations } from '@/hooks/useLocations';
import { DataTable } from '../Employees/data-table';
import { useState } from 'react';
import { Filters } from '@/services/getEmployeesService';

export const LocationsScreen = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const {
    data: locations = {
      data: [],
      pagesCount: 0,
    },
    isError,
    isLoading,
  } = useLocations(filters);
  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <div>المناطق</div>
      <DataTable
        columns={columns}
        navigationURL="/locations/add"
        data={locations.data}
        setFilters={setFilters}
        filters={{
          ...filters,
          pagesCount: locations.pagesCount,
        }}
      />
    </AppLayout>
  );
};
