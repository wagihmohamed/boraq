import { EmployeesFilters, useEmployees } from '@/hooks/useEmployees';
import { useState } from 'react';
import { LoadingOverlay, MultiSelect } from '@mantine/core';
import { rolesArabicNames, rolesArray } from '@/lib/rolesArabicNames';
import { DataTable } from '@/screens/Employees/data-table';
import { columns } from './columns';

export const DeletedEmployees = () => {
  const [filters, setFilters] = useState<EmployeesFilters>({
    page: 1,
    size: 10,
    deleted: true,
  });
  const {
    data: employees = {
      data: [],
      pagesCount: 0,
    },
    isInitialLoading,
  } = useEmployees(filters);

  const handleSelect = (value: (keyof typeof rolesArabicNames)[]) => {
    setFilters((prev) => ({
      ...prev,
      roles: value,
    }));
  };

  return (
    <>
      <MultiSelect
        className="mt-4 my-10"
        label="الدور"
        data={rolesArray.filter((role) => role.value !== 'SUPER_ADMIN')}
        clearable
        placeholder="الدور"
        value={filters.roles}
        onChange={handleSelect}
      />
      <div className="relative mt-12">
        <LoadingOverlay visible={isInitialLoading} />
        <DataTable
          columns={columns}
          data={employees.data}
          setFilters={setFilters}
          filters={{
            ...filters,
            pagesCount: employees.pagesCount,
          }}
        />
      </div>
    </>
  );
};
