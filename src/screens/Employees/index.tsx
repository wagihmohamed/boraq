import { AppLayout } from '@/components/AppLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { EmployeesFilters, useEmployees } from '@/hooks/useEmployees';
import { useState } from 'react';
import { Grid, LoadingOverlay, MultiSelect, Select } from '@mantine/core';
import { rolesArabicNames, rolesArray } from '@/lib/rolesArabicNames';
import { useBranches } from '@/hooks/useBranches';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { useLocations } from '@/hooks/useLocations';

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

  const { data: branchesData } = useBranches({ size: 1000 });
  const { data: locationsData } = useLocations({ size: 1000 });

  return (
    <AppLayout isError={isError}>
      <Grid className="mt-4 my-10">
        <Grid.Col span={{ base: 12, sm: 12, xs: 12, md: 6, lg: 6 }}>
          <MultiSelect
            label="الدور"
            data={rolesArray.filter((role) => role.value !== 'SUPER_ADMIN')}
            clearable
            placeholder="الدور"
            value={filters.roles}
            onChange={handleSelect}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12, xs: 12, md: 6, lg: 6 }}>
          <Select
            label="الفروع"
            data={getSelectOptions(branchesData?.data || [])}
            clearable
            placeholder="اختار الفرع"
            value={filters.branch_id?.toString()}
            onChange={(e) => {
              setFilters({
                ...filters,
                branch_id: Number(e) || null,
              });
            }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12, xs: 12, md: 6, lg: 6 }}>
          <Select
            label="المناطق"
            data={getSelectOptions(locationsData?.data || [])}
            clearable
            placeholder="اختار المنطقة"
            value={filters.branch_id?.toString()}
            onChange={(e) => {
              setFilters({
                ...filters,
                location_id: Number(e) || null,
              });
            }}
          />
        </Grid.Col>
      </Grid>
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
