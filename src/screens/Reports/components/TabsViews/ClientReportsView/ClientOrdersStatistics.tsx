import { Order, OrdersMetaData } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';
import { useClientByStoreId } from '@/hooks/useClients';

interface ClientOrdersStatisticsProps {
  orders: Order[];
  storeID: string;
  ordersMetaData: OrdersMetaData;
}

export const ClientOrdersStatistics = ({
  orders,
  storeID,
  ordersMetaData,
}: ClientOrdersStatisticsProps) => {
  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const { mutate: getClientId } = useClientByStoreId();

  const handleCreateReport = () => {
    const ordersIDs = orders.map((order) => order.id);
    getClientId(storeID, {
      onSuccess({ data }) {
        const mutationParams: CreateReportPayload = {
          ordersIDs,
          type: 'CLIENT',
          storeID: Number(storeID),
          clientID: data[0].id,
        };
        toast.promise(createReport(mutationParams), {
          loading: 'جاري تصدير الكشف',
          success: 'تم تصدير الكشف بنجاح',
          error: (error) => error.message || 'حدث خطأ ما',
        });
      },
    });
  };
  return (
    <Grid align="center" className="mt-4" grow>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="عدد الطلبيات"
          value={ordersMetaData.count || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="المبلغ الكلي"
          value={ordersMetaData.totalCost || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="مبلغ التوصيل"
          value={ordersMetaData.deliveryCost || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="صافي العميل"
          value={ordersMetaData.clientNet || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="عدد طلبات الراجعة"
          value={
            ordersMetaData?.countByStatus?.find(
              (status) => status.status === 'RETURNED'
            )?.count || 0
          }
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="عدد الطلبات الواصلة"
          value={
            ordersMetaData?.countByStatus?.find(
              (status) => status.status === 'DELIVERED'
            )?.count || 0
          }
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <StatisticsItem
          title="عدد الطلبات الراجعة جزئياً"
          value={
            ordersMetaData?.countByStatus?.find(
              (status) => status.status === 'PARTIALLY_RETURNED'
            )?.count || 0
          }
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <Button
          disabled={orders.length === 0 || isLoading || !storeID}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف عميل
        </Button>
      </Grid.Col>
    </Grid>
  );
};
