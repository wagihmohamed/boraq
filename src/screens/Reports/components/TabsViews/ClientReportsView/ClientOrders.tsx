import { useStores } from '@/hooks/useStores';
import { Button, Grid, MultiSelect, Paper, Select } from '@mantine/core';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { OrdersFilter } from '@/services/getOrders';
import { convertDateFormat } from '@/lib/convertDate';
import { DateTimePicker } from '@mantine/dates';
import 'dayjs/locale/ar';

interface IReportsFilter {
  ordersFilters: OrdersFilter;
  setOrdersFilters: React.Dispatch<React.SetStateAction<OrdersFilter>>;
}

const ordersStatuses: { label: string; value: string }[] = [
  {
    label: 'تم التوصيل',
    value: 'DELIVERED',
  },
  {
    label: 'راجع جزئياً',
    value: 'PARTIALLY_RETURNED',
  },
  {
    label: 'تم الإرجاع',
    value: 'RETURNED',
  },
];

export const ClientOrders = ({
  ordersFilters,
  setOrdersFilters,
}: IReportsFilter) => {
  const {
    data: storesData = {
      data: [],
    },
  } = useStores({ size: 1000, only_title_and_id: true });

  const handleResetRangeDate = () => {
    setOrdersFilters({
      ...ordersFilters,
      start_date: null,
      end_date: null,
    });
  };

  return (
    <Paper className="p-4" withBorder>
      <Grid className="mb-5">
        <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
          <Select
            value={ordersFilters.store_id}
            allowDeselect
            label="المتجر"
            searchable
            clearable
            onChange={(e) => {
              setOrdersFilters({
                ...ordersFilters,
                store_id: e || '',
              });
            }}
            placeholder="اختر المتجر"
            limit={100}
            data={getSelectOptions(storesData.data)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
          <MultiSelect
            value={ordersFilters.statuses}
            label="الحالة"
            searchable
            clearable
            onChange={(e) => {
              setOrdersFilters({
                ...ordersFilters,
                statuses: e || '',
              });
            }}
            placeholder="اختر الحالة"
            data={ordersStatuses}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
          <div className="flex items-center gap-4 flex-wrap">
            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="بداية تاريخ الكشف"
              value={
                ordersFilters.start_date
                  ? new Date(ordersFilters.start_date)
                  : null
              }
              placeholder="اختر تاريخ البداية"
              locale="ar"
              clearable
              onChange={(date) => {
                const formattedDate = convertDateFormat(date);
                setOrdersFilters({
                  ...ordersFilters,
                  start_date: formattedDate,
                });
              }}
            />
            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="نهاية تاريخ الكشف"
              placeholder="اختر تاريخ النهاية"
              value={
                ordersFilters.end_date ? new Date(ordersFilters.end_date) : null
              }
              locale="ar"
              clearable
              onChange={(date) => {
                const formattedDate = convertDateFormat(date);
                setOrdersFilters({
                  ...ordersFilters,
                  end_date: formattedDate,
                });
              }}
            />
            {ordersFilters.end_date && ordersFilters.start_date && (
              <Button
                onClick={handleResetRangeDate}
                className="mt-6"
                variant="outline"
              >
                الحذف
              </Button>
            )}
          </div>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
