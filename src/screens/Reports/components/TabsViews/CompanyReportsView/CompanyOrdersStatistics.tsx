import { Order, OrdersMetaData } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';
import { useAuth } from '@/store/authStore';

interface CompanyOrdersStatisticsProps {
  orders: Order[];
  ordersMetaData: OrdersMetaData;
}

export const CompanyOrdersStatistics = ({
  orders,
  ordersMetaData,
}: CompanyOrdersStatisticsProps) => {
  const { companyID } = useAuth();
  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const handleCreateReport = () => {
    const ordersIDs = orders.map((order) => order.id);

    const mutationParams: CreateReportPayload = {
      ordersIDs,
      type: 'COMPANY',
      companyID: Number(companyID),
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
          disabled={orders.length === 0 || isLoading}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف شركة
        </Button>
      </Grid.Col>
    </Grid>
  );
};
