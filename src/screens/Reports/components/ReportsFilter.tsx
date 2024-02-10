import { useClients } from '@/hooks/useClients';
import { useEmployees } from '@/hooks/useEmployees';
import { useRepositories } from '@/hooks/useRepositories';
import { useStores } from '@/hooks/useStores';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { governorateArray } from '@/lib/governorateArabicNames ';
import { reportStatusArray } from '@/lib/reportStatusArabicNames';
import { reportTypeArray } from '@/lib/reportTypeArabicNames';
import { ReportsFilters as IReportsFilters } from '@/services/getReports';
import { Accordion, Button, Grid, Popover, Select, rem } from '@mantine/core';
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
  } = useClients({ size: 1000 });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 1000 });

  const {
    data: repositoriesData = {
      data: [],
    },
  } = useRepositories({ size: 1000 });

  const {
    data: employeesData = {
      data: [],
    },
  } = useEmployees({ size: 1000, roles: ['DELIVERY_AGENT'] });

  const {
    data: reportCreatedBy = {
      data: [],
    },
  } = useEmployees({
    size: 1000,
    roles: [
      'ACCOUNTANT',
      'ACCOUNT_MANAGER',
      'BRANCH_MANAGER',
      'COMPANY_MANAGER',
      'DATA_ENTRY',
      'EMERGENCY_EMPLOYEE',
      'INQUIRY_EMPLOYEE',
      'RECEIVING_AGENT',
      'REPOSITORIY_EMPLOYEE',
    ],
  });

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
    <Accordion variant="separated">
      <Accordion.Item className="rounded-md mb-8" value="reports-filter">
        <Accordion.Control> الفلاتر</Accordion.Control>
        <Accordion.Panel>
          <Grid align="center" gutter="lg">
            <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
              <Select
                value={filters.type}
                allowDeselect
                label="نوع الكشف"
                searchable
                clearable
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    type: e || '',
                  });
                }}
                placeholder="اختر النوع"
                data={reportTypeArray}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
              <Select
                value={filters.type}
                allowDeselect
                label="ساحب الكشف"
                searchable
                clearable
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    created_by_id: e || '',
                  });
                }}
                placeholder="اختر ساحب الكشف"
                data={getSelectOptions(reportCreatedBy.data)}
              />
            </Grid.Col>
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
                limit={100}
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
                limit={100}
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
                limit={100}
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
                limit={100}
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
                          ? [
                              new Date(filters.start_date),
                              new Date(filters.end_date),
                            ]
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
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
