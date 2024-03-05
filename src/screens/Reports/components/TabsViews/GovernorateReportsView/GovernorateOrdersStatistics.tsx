import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

interface GovernorateOrdersStatisticsProps {
  ordersParams: OrdersFilter;
  ordersLength: number;
  governorate: keyof typeof governorateArabicNames;
  ordersMetaData: OrdersMetaData;
}

export const GovernorateOrdersStatistics = ({
  ordersLength,
  ordersParams,
  governorate,
  ordersMetaData,
}: GovernorateOrdersStatisticsProps) => {
  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const handleCreateReport = () => {
    const mutationParams: CreateReportPayload = {
      ordersIDs: '*',
      params: ordersParams,
      type: 'GOVERNORATE',
      governorate,
    };
    toast.promise(createReport(mutationParams), {
      loading: 'جاري تصدير الكشف',
      success: 'تم تصدير الكشف بنجاح',
      error: (error) => error.message || 'حدث خطأ ما',
    });
  };
  return (
    <Grid align="center" className="mt-4" grow>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem title="عدد الطلبيات" value={ordersMetaData.count} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem title="المبلغ الكلي" value={ordersMetaData.totalCost} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="مبلغ التوصيل"
          value={ordersMetaData.deliveryCost}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem title="صافي العميل" value={ordersMetaData.clientNet} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <Button
          disabled={ordersLength === 0 || isLoading || !governorate}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف محافظة
        </Button>
      </Grid.Col>
    </Grid>
  );
};
