import { Order } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';

interface BranchesOrdersStatisticsProps {
  orders: Order[];
  branchId: string;
}

export const BranchesOrdersStatistics = ({
  orders,
  branchId,
}: BranchesOrdersStatisticsProps) => {
  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const handleCreateReport = () => {
    const ordersIDs = orders.map((order) => order.id);

    const mutationParams: CreateReportPayload = {
      ordersIDs,
      type: 'CLIENT',
      branchID: Number(branchId),
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
        <StatisticsItem title="عدد الطلبيات" value={4} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem title="المبلغ الكلي" value={273000} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem title="مبلغ التوصيل" value={26000} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem title="الصافي للعميل" value={247000} />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <Button
          //   disabled={orders.length === 0 || isLoading}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف فرع
        </Button>
      </Grid.Col>
    </Grid>
  );
};
