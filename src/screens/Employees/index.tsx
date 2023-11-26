import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { EmployeesFilters, useEmployees } from '@/hooks/useEmployees';
import { useState } from 'react';
import { LoadingOverlay, MultiSelect } from '@mantine/core';
import { rolesArabicNames, rolesArray } from '@/lib/rolesArabicNames';

export const Employees = () => {
  const [filters, setFilters] = useState<EmployeesFilters>({
    page: 1,
    size: 10,
  });
  const {
    data: employees = {
      data: [],
      pagesCount: 0,
    },
    isError,
    isInitialLoading,
  } = useEmployees(filters);

  const handleSelect = (value: (keyof typeof rolesArabicNames)[]) => {
    setFilters((prev) => ({
      ...prev,
      roles: value,
    }));
  };

  return (
    <AppLayout isError={isError}>
      <MultiSelect
        className="mt-4 my-10"
        label="الدور"
        data={rolesArray}
        clearable
        placeholder="الدور"
        value={filters.roles}
        onChange={handleSelect}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          navigationURL="/employees/add"
          columns={columns}
          data={employees.data}
          setFilters={setFilters}
          filters={{
            ...filters,
            pagesCount: employees.pagesCount,
          }}
          navButtonTitle="إضافة موظف"
        />
      </div>
    </AppLayout>
  );
};
