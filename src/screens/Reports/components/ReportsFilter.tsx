import { useClients } from '@/hooks/useClients';
import { useEmployees } from '@/hooks/useEmployees';
import { useRepositories } from '@/hooks/useRepositories';
import { useStores } from '@/hooks/useStores';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { reportStatusArray } from '@/lib/reportStatusArabicNames';
import { ReportsFilters as IReportsFilters } from '@/services/getReports';
import { Button, Grid, Popover, Select, rem } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { format, parseISO } from 'date-fns';
import 'dayjs/locale/ar';

interface IReportsFilter {
  filters: IReportsFilters;
  setFilters: React.Dispatch<React.SetStateAction<IReportsFilters>>;
}

export const ReportsFilter = ({ filters, setFilters }: IReportsFilter) => {
  const {
    data: clientsData = {
      data: [],
    },
  } = useClients({ size: 500 });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 500 });

  const {
    data: repositoriesData = {
      data: [],
    },
  } = useRepositories({ size: 500 });

  const {
    data: employeesData = {
      data: [],
    },
  } = useEmployees({ size: 500, roles: ['DELIVERY_AGENT'] });

  const handleResetRangeDate = () => {
    setFilters({
      ...filters,
      start_date: null,
      end_date: null,
    });
  };

  const convertDateFormat = (date: Date | null): string | null => {
    if (date) {
      const parsedDate = parseISO(date.toISOString());
      return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    return null;
  };

  return (
    <Grid align="center" gutter="lg">
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.governorate}
          allowDeselect
          label="المحافظة"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              governorate: e || '',
            });
          }}
          placeholder="اختر المحافظة"
          data={governorateArray}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.status}
          allowDeselect
          label="الحالة"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              status: e || '',
            });
          }}
          placeholder="اختر الحالة"
          data={reportStatusArray}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.client_id}
          allowDeselect
          label="العملاء"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              client_id: e || '',
            });
          }}
          placeholder="اختر العميل"
          data={getSelectOptions(clientsData.data)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.repository_id}
          allowDeselect
          label="المخزن"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              repository_id: e || '',
            });
          }}
          placeholder="اختر المخزن"
          data={getSelectOptions(repositoriesData.data)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.store_id}
          allowDeselect
          label="المتجر"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              store_id: e || '',
            });
          }}
          placeholder="اختر المتجر"
          data={getSelectOptions(storesData.data)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.delivery_agent_id}
          allowDeselect
          label="المندوب"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              delivery_agent_id: e || '',
            });
          }}
          placeholder="اختر المندوب"
          data={getSelectOptions(employeesData.data)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <Select
          value={filters.sort}
          allowDeselect
          label="الترتيب"
          searchable
          clearable
          onChange={(e) => {
            setFilters({
              ...filters,
              sort: e || '',
            });
          }}
          placeholder="اختر الترتيب"
          data={[
            {
              label: 'الأحدث',
              value: 'id:desc',
            },
            {
              label: 'الأقدم',
              value: 'id:asc',
            },
          ]}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
        <div className="flex items-center gap-4 flex-wrap">
          <Popover
            width={rem(300)}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Button className="mt-6">بداية ونهاية تاريخ الكشف </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <DatePicker
                locale="ar"
                type="range"
                allowSingleDateInRange
                value={
                  filters.end_date && filters.start_date
                    ? [new Date(filters.start_date), new Date(filters.end_date)]
                    : [null, null]
                }
                onChange={(date) => {
                  const formatedStartDate = convertDateFormat(date[0]);
                  const formatedEndDate = convertDateFormat(date[1]);
                  setFilters({
                    ...filters,
                    start_date: formatedStartDate,
                    end_date: formatedEndDate,
                  });
                }}
              />
              {filters.end_date && filters.start_date && (
                <Button
                  onClick={handleResetRangeDate}
                  fullWidth
                  className="mt-3"
                  variant="outline"
                >
                  الحذف
                </Button>
              )}
            </Popover.Dropdown>
          </Popover>
        </div>
      </Grid.Col>
    </Grid>
  );
};
