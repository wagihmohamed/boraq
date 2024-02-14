import { Button, Grid, MultiSelect, Paper, Select } from '@mantine/core';
import { OrdersFilter } from '@/services/getOrders';
import { convertDateFormat } from '@/lib/convertDate';
import { DateTimePicker } from '@mantine/dates';
import 'dayjs/locale/ar';
import { reportOrderStatuses } from '@/lib/reportOrderStatuses';
import { governorateArray } from '@/lib/governorateArabicNames ';

interface GovernorateOrdersProps {
  governorateFilter: OrdersFilter;
  setGovernorateFilter: React.Dispatch<React.SetStateAction<OrdersFilter>>;
}

export const GovernorateOrdersFilters = ({
  governorateFilter,
  setGovernorateFilter,
}: GovernorateOrdersProps) => {
  const handleResetRangeDate = () => {
    setGovernorateFilter({
      ...governorateFilter,
      start_date: null,
      end_date: null,
    });
  };

  return (
    <Paper className="p-4" withBorder>
      <Grid className="mb-5">
        <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
          <Select
            value={governorateFilter.governorate}
            label="المحافظة"
            searchable
            clearable
            onChange={(e) => {
              setGovernorateFilter({
                ...governorateFilter,
                governorate: e || '',
              });
            }}
            placeholder="اختر المحافظة"
            limit={100}
            data={governorateArray}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
          <MultiSelect
            value={governorateFilter.statuses}
            label="الحالة"
            searchable
            clearable
            onChange={(e) => {
              setGovernorateFilter({
                ...governorateFilter,
                statuses: e || '',
              });
            }}
            placeholder="اختر الحالة"
            data={reportOrderStatuses}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
          <div className="flex items-center gap-4 flex-wrap">
            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="بداية تاريخ الكشف"
              value={
                governorateFilter.start_date
                  ? new Date(governorateFilter.start_date)
                  : null
              }
              placeholder="اختر تاريخ البداية"
              locale="ar"
              clearable
              onChange={(date) => {
                const formattedDate = convertDateFormat(date);
                setGovernorateFilter({
                  ...governorateFilter,
                  start_date: formattedDate,
                });
              }}
            />
            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="نهاية تاريخ الكشف"
              placeholder="اختر تاريخ النهاية"
              value={
                governorateFilter.end_date
                  ? new Date(governorateFilter.end_date)
                  : null
              }
              locale="ar"
              clearable
              onChange={(date) => {
                const formattedDate = convertDateFormat(date);
                setGovernorateFilter({
                  ...governorateFilter,
                  end_date: formattedDate,
                });
              }}
            />
            {governorateFilter.end_date && governorateFilter.start_date && (
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
