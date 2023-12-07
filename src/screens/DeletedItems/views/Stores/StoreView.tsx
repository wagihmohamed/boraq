import { useStores } from '@/hooks/useStores';
import { Filters } from '@/services/getEmployeesService';
import { useState } from 'react';
import { columns } from './columns';
import { DataTable } from '@/screens/Employees/data-table';

export const DeletedStoresView = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
    deleted: true,
  });

  const {
    data: stores = {
      data: [],
      pagesCount: 0,
      page: 1,
    },
  } = useStores(filters);

  return (
    <DataTable
      data={stores.data}
      columns={columns}
      filters={{
        ...filters,
        pagesCount: stores.pagesCount,
      }}
      setFilters={setFilters}
      navButtonTitle="إضافة متجر"
    />
  );
};
