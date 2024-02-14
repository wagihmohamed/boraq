import { governorateArray } from '@/lib/governorateArabicNames ';
import { orderStatusArray } from '@/lib/orderStatusArabicNames';
import { deliveryTypesArray } from '@/lib/deliveryTypesArabicNames';
import { useClients } from '@/hooks/useClients';
import { useStores } from '@/hooks/useStores';
import { useLocations } from '@/hooks/useLocations';
import { DateTimePicker } from '@mantine/dates';
import 'dayjs/locale/ar';
import { parseISO, format } from 'date-fns';
import {
  Accordion,
  Button,
  Grid,
  MultiSelect,
  Select,
  TextInput,
} from '@mantine/core';
import { OrdersFilter as IOrdersFilter } from '@/services/getOrders';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { ExportReportModal } from './ExportReportModal';
import { useEmployees } from '@/hooks/useEmployees';
import { withReportsDataOptions } from '@/lib/getReportParam';
import { ChangeOrdersBranch } from './ChangeOrdersBranch';
import { ChangeOrdersClient } from './ChangeOrdersClient';
import { ChangeOrdersDelivery } from './ChangeOrdersDelivery';
import { ChangeOrdersStatus } from './ChangeOrdersStatus';

interface OrdersFilter {
  filters: IOrdersFilter;
  setFilters: React.Dispatch<React.SetStateAction<IOrdersFilter>>;
  search: string;
  setSearch: (newValue: string) => void;
}

export const CustomOrdersFilter = ({
  filters,
  setFilters,
  search,
  setSearch,
}: OrdersFilter) => {
  const {
    data: clientsData = {
      data: [],
    },
  } = useClients({ size: 1000, only_title_and_id: true });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 1000, only_title_and_id: true });

  const {
    data: locationsData = {
      data: [],
    },
  } = useLocations({ size: 1000, only_title_and_id: true });
  const {
    data: employeesData = {
      data: [],
    },
  } = useEmployees({
    size: 1000,
    only_title_and_id: true,
    roles: ['DELIVERY_AGENT'],
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
    <>
      <Grid align="center" gutter="lg" className="mb-4">
        <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
          <div className="flex items-center gap-2 flex-wrap">
            <ExportReportModal />
            <ChangeOrdersBranch />
            <ChangeOrdersClient />
            <ChangeOrdersDelivery />
            <ChangeOrdersStatus />
          </div>
        </Grid.Col>
      </Grid>
      <Accordion variant="separated">
        <Accordion.Item className="rounded-md mb-8" value="orders-filter">
          <Accordion.Control> الفلاتر</Accordion.Control>
          <Accordion.Panel>
            <Grid align="center" gutter="lg">
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
                <TextInput
                  placeholder="رقم الكشف, اسم, عنوان او رقم هاتف المستلم"
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
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
                <MultiSelect
                  value={filters.statuses}
                  label="الحالة"
                  searchable
                  clearable
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      statuses: e || '',
                    });
                  }}
                  placeholder="اختر الحالة"
                  data={orderStatusArray}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
                <Select
                  value={filters.delivery_type}
                  allowDeselect
                  label="نوع التوصيل"
                  searchable
                  clearable
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      delivery_type: e || '',
                    });
                  }}
                  placeholder="اختر نوع التوصيل"
                  data={deliveryTypesArray}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
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
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
                <Select
                  value={filters.delivery_agent_id?.toString()}
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
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
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
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
                <Select
                  value={filters.location_id}
                  allowDeselect
                  label="المناطق"
                  searchable
                  clearable
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      location_id: e || '',
                    });
                  }}
                  placeholder="اختر المنطقة"
                  data={getSelectOptions(locationsData.data)}
                  limit={100}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
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
              <Grid.Col span={{ base: 12, md: 4, lg: 3, sm: 12, xs: 12 }}>
                <Select
                  label="كشف شركة"
                  placeholder="اختر كشف شركة"
                  data={withReportsDataOptions}
                  clearable
                  defaultValue={filters.company_report}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      company_report: e,
                    });
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3, sm: 12, xs: 12 }}>
                <Select
                  label="كشف مخزن"
                  placeholder="اختر كشف مخزن"
                  data={withReportsDataOptions}
                  clearable
                  defaultValue={filters.repository_report}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      repository_report: e,
                    });
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3, sm: 12, xs: 12 }}>
                <Select
                  label="كشف عميل"
                  placeholder="اختر كشف عميل"
                  data={withReportsDataOptions}
                  clearable
                  defaultValue={filters.client_report}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      client_report: e,
                    });
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3, sm: 12, xs: 12 }}>
                <Select
                  label="كشف فرع"
                  placeholder="اختر كشف فرع"
                  data={withReportsDataOptions}
                  clearable
                  defaultValue={filters.branch_report}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      branch_report: e,
                    });
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3, sm: 12, xs: 12 }}>
                <Select
                  label="كشف مندوب"
                  placeholder="اختر كشف مندوب"
                  data={withReportsDataOptions}
                  clearable
                  defaultValue={filters.delivery_agent_report}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      delivery_agent_report: e,
                    });
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4, lg: 3, sm: 12, xs: 12 }}>
                <Select
                  label="كشف محافظة"
                  placeholder="اختر كشف محافظة"
                  data={withReportsDataOptions}
                  clearable
                  defaultValue={filters.governorate_report}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      governorate_report: e,
                    });
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 12, sm: 12, xs: 12 }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <DateTimePicker
                    className="w-60"
                    valueFormat="DD MMM YYYY hh:mm A"
                    label="بداية تاريخ الكشف"
                    value={
                      filters.delivery_date
                        ? new Date(filters.delivery_date)
                        : null
                    }
                    placeholder="اختر تاريخ البداية"
                    locale="ar"
                    clearable
                    onChange={(date) => {
                      const newDeliveryDate = convertDateFormat(date);
                      setFilters({
                        ...filters,
                        delivery_date: newDeliveryDate,
                      });
                    }}
                  />
                  <DateTimePicker
                    className="w-60"
                    valueFormat="DD MMM YYYY hh:mm A"
                    label="بداية تاريخ الكشف"
                    value={
                      filters.start_date ? new Date(filters.start_date) : null
                    }
                    placeholder="اختر تاريخ البداية"
                    locale="ar"
                    clearable
                    onChange={(date) => {
                      const formattedDate = convertDateFormat(date);
                      setFilters({
                        ...filters,
                        start_date: formattedDate,
                      });
                    }}
                  />
                  <DateTimePicker
                    className="w-60"
                    valueFormat="DD MMM YYYY hh:mm A"
                    label="نهاية تاريخ الكشف"
                    placeholder="اختر تاريخ النهاية"
                    value={filters.end_date ? new Date(filters.end_date) : null}
                    locale="ar"
                    clearable
                    onChange={(date) => {
                      const formattedDate = convertDateFormat(date);
                      setFilters({
                        ...filters,
                        end_date: formattedDate,
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
                </div>
              </Grid.Col>
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
