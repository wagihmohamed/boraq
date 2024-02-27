import { useBranches } from '@/hooks/useBranches';
import { useClients } from '@/hooks/useClients';
import { useEmployees } from '@/hooks/useEmployees';
import { useRepositories } from '@/hooks/useRepositories';
import { useStores } from '@/hooks/useStores';
import { withReportsDataOptions } from '@/lib/getReportParam';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { repositoryEntriesStatuses } from '@/lib/repositoryEntriesStatuses';
import { Accordion, Button, Grid, Select, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

export const RepositoryEntriesFilters = () => {
  const { data: repositoriesData } = useRepositories({
    size: 100000,
    minified: true,
  });

  const { data: branchesData } = useBranches({
    size: 100000,
    minified: true,
  });
  const { data: clientsData } = useClients({
    size: 100000,
    minified: true,
  });
  const { data: storesData } = useStores({
    size: 100000,
    minified: true,
  });
  const { data: employeesData } = useEmployees({
    size: 100000,
    minified: true,
    roles: ['DELIVERY_AGENT'],
  });

  const handleResetRangeDate = () => {
    // setFilters({
    //   ...filters,
    //   start_date: null,
    //   end_date: null,
    // });
  };

  return (
    <div>
      <Accordion variant="separated">
        <Accordion.Item className="rounded-md mb-8" value="orders-filter">
          <Accordion.Control> الفلاتر</Accordion.Control>
          <Accordion.Panel>
            <Grid gutter="lg">
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <TextInput
                  size="md"
                  placeholder="رقم الوصل"
                  label="رقم الوصل"
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  data={getSelectOptions(repositoriesData?.data || [])}
                  searchable
                  clearable
                  placeholder="المخزن"
                  label="المخزن"
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  data={getSelectOptions(branchesData?.data || [])}
                  searchable
                  clearable
                  placeholder="الفرع"
                  label="الفرع"
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  searchable
                  label="المحافظة"
                  placeholder="اختار المحافظة"
                  limit={100}
                  data={governorateArray}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  data={getSelectOptions(branchesData?.data || [])}
                  searchable
                  clearable
                  placeholder="الفرع المرسل اليه"
                  label="الفرع المرسل اليه"
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  data={repositoryEntriesStatuses}
                  searchable
                  clearable
                  placeholder="الحالة"
                  label="الحالة"
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  data={getSelectOptions(clientsData?.data || [])}
                  searchable
                  clearable
                  placeholder="العميل"
                  label="العميل"
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  data={getSelectOptions(storesData?.data || [])}
                  searchable
                  clearable
                  placeholder="المتجر"
                  label="المتجر"
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  data={getSelectOptions(employeesData?.data || [])}
                  searchable
                  clearable
                  placeholder="مندوب التوصيل"
                  label="مندوب التوصيل"
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  label="كشف رواجع عميل"
                  placeholder="كشف رواجع عميل"
                  data={withReportsDataOptions}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  label="كشف رواجع للشركة"
                  placeholder="كشف رواجع للشركة"
                  data={withReportsDataOptions}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                <Select
                  label="كشف المخزن"
                  placeholder="كشف المخزن"
                  data={withReportsDataOptions}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ md: 12, lg: 12, sm: 12, xs: 12 }}>
                <div className="flex items-center gap-4 flex-wrap">
                  <DateTimePicker
                    className="w-60"
                    valueFormat="DD MMM YYYY hh:mm A"
                    label="بداية تاريخ الطلب"
                    // value={
                    //   filters.start_date ? new Date(filters.start_date) : null
                    // }
                    placeholder="اختر تاريخ البداية"
                    locale="ar"
                    clearable
                    // onChange={(date) => {
                    //   const formattedDate = convertDateFormat(date);
                    //   setFilters({
                    //     ...filters,
                    //     start_date: formattedDate,
                    //   });
                    // }}
                  />
                  <DateTimePicker
                    className="w-60"
                    valueFormat="DD MMM YYYY hh:mm A"
                    label="نهاية تاريخ الطلب"
                    placeholder="اختر تاريخ النهاية"
                    // value={filters.end_date ? new Date(filters.end_date) : null}
                    locale="ar"
                    clearable
                    // onChange={(date) => {
                    //   const formattedDate = convertDateFormat(date);
                    //   setFilters({
                    //     ...filters,
                    //     end_date: formattedDate,
                    //   });
                    // }}
                  />
                  {/* {filters.end_date && filters.start_date && ( */}
                  <Button
                    onClick={handleResetRangeDate}
                    className="mt-6"
                    variant="outline"
                  >
                    الحذف
                  </Button>
                  {/* )} */}
                </div>
              </Grid.Col>
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
