import { useBranches } from '@/hooks/useBranches';
import { useEmployees } from '@/hooks/useEmployees';
import { getSelectOptions } from '@/lib/getSelectOptions';
import {
  governorateArabicNames,
  governorateArray,
} from '@/lib/governorateArabicNames ';
import { LocationFilters } from '@/services/getLocations';
import { Grid, Select, TextInput } from '@mantine/core';

interface ILocationsFilter {
  filters: LocationFilters;
  setFilters: React.Dispatch<React.SetStateAction<LocationFilters>>;
  search: string;
  setSearch: (newValue: string) => void;
}

export const LocationsFilter = ({
  filters,
  search,
  setFilters,
  setSearch,
}: ILocationsFilter) => {
  const {
    data: branchesData = {
      data: [],
    },
  } = useBranches({ size: 500 });
  const {
    data: employeesData = {
      data: [],
    },
  } = useEmployees({ size: 500, roles: ['DELIVERY_AGENT'] });

  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 4 }}>
        <TextInput
          placeholder="بحث"
          defaultValue={search}
          label="بحث"
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.governorate}
          allowDeselect
          label="المحافظة"
          searchable
          clearable
          onChange={(e: keyof typeof governorateArabicNames) => {
            setFilters({
              ...filters,
              governorate: e || '',
            });
          }}
          placeholder="اختر المحافظة"
          data={governorateArray}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.branch_id?.toString()}
          allowDeselect
          label="الفروع"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              branch_id: Number(e) || 0,
            });
          }}
          placeholder="اختر الفرع"
          data={getSelectOptions(branchesData.data)}
          limit={100}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.delivery_agent_id?.toString()}
          allowDeselect
          label="مندوبين التوصيل"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              delivery_agent_id: Number(e) || null,
            });
          }}
          placeholder="اختر مندوب"
          data={getSelectOptions(employeesData.data)}
          limit={100}
        />
      </Grid.Col>
    </Grid>
  );
};
