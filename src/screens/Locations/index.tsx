import { AppLayout } from '@/components/AppLayout';
import { columns } from './columns';
import { useLocations } from '@/hooks/useLocations';
import { DataTable } from '../Employees/data-table';
import { useState } from 'react';
import { LocationsFilter } from './LocationsFilter';
import { LocationFilters } from '@/services/getLocations';
import { useDebouncedState } from '@mantine/hooks';
import { LoadingOverlay } from '@mantine/core';

export const LocationsScreen = () => {
  const [filters, setFilters] = useState<LocationFilters>({
    page: 1,
    size: 10,
  });

  const [search, setSearch] = useDebouncedState('', 300);

  const {
    data: locations = {
      data: [],
      pagesCount: 0,
    },
    isError,
    isInitialLoading,
  } = useLocations({
    ...filters,
    search,
  });

  return (
    <AppLayout isError={isError}>
      <LocationsFilter
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          columns={columns}
          navigationURL="/locations/add"
          data={locations.data}
          setFilters={setFilters}
          filters={{
            ...filters,
            pagesCount: locations.pagesCount,
          }}
          navButtonTitle="إضافة منطقة"
        />
      </div>
    </AppLayout>
  );
};
