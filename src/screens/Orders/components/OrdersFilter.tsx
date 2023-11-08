import { governorateArray } from '@/lib/governorateArabicNames ';
import { orderStatusArray } from '@/lib/orderStatusArabicNames';
import { deliveryTypesArray } from '@/lib/deliveryTypesArabicNames';
import { useClients } from '@/hooks/useClients';
import { useStores } from '@/hooks/useStores';
import { useLocations } from '@/hooks/useLocations';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/ar';
import { parseISO, format } from 'date-fns';
import { Button, Grid, Popover, Select, TextInput, rem } from '@mantine/core';
import { OrdersFilter as IOrdersFilter } from '@/services/getOrders';
import { getSelectOptions } from '@/lib/getSelectOptions';

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
  } = useClients({ size: 500 });

  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 500 });

  const {
    data: locationsData = {
      data: [],
    },
  } = useLocations({ size: 500 });

  const handleResetDate = () => {
    setFilters({
      ...filters,
      delivery_date: null,
    });
  };
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
        <TextInput
          placeholder="رقم الكشف, اسم, عنوان او رقم هاتف المستلم"
          defaultValue={search}
          label="بحث"
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
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
          data={orderStatusArray}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
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
              <Button className="mt-6">اختيار تاريخ التوصيل</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <DatePicker
                locale="ar"
                value={
                  filters.delivery_date ? new Date(filters.delivery_date) : null
                }
                onChange={(date) => {
                  const newDeliveryDate = convertDateFormat(date);
                  setFilters({
                    ...filters,
                    delivery_date: newDeliveryDate,
                  });
                }}
              />
              {filters.delivery_date && (
                <Button
                  onClick={handleResetDate}
                  fullWidth
                  className="mt-3"
                  variant="outline"
                >
                  الحذف
                </Button>
              )}
            </Popover.Dropdown>
          </Popover>
          <Popover
            width={rem(300)}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Button className="mt-6">بداية ونهاية تاريخ عمل الطلب</Button>
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
