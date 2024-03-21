import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid, TextInput } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';
import { useClientByStoreId } from '@/hooks/useClients';
import { useState } from 'react';

interface ClientOrdersStatisticsProps {
  storeID: string;
  ordersMetaData: OrdersMetaData;
  ordersParams: OrdersFilter;
  ordersLength: number;
}

export const ClientOrdersStatistics = ({
  storeID,
  ordersMetaData,
  ordersLength,
  ordersParams,
}: ClientOrdersStatisticsProps) => {
  const [baghdadDeliveryCost, setBaghdadDeliveryCost] = useState<number>();
  const [governoratesDeliveryCost, setGovernoratesDeliveryCost] =
    useState<number>();
  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const { mutate: getClientId } = useClientByStoreId();

  const handleCreateReport = () => {
    if (!baghdadDeliveryCost && !governoratesDeliveryCost) {
      toast.error('الرجاء ادخال اجور التوصيل');
      return;
    }
    getClientId(storeID, {
      onSuccess({ data }) {
        const mutationParams: CreateReportPayload = {
          ordersIDs: '*',
          params: ordersParams,
          type: 'CLIENT',
          storeID: Number(storeID),
          clientID: data[0].id,
          baghdadDeliveryCost,
          governoratesDeliveryCost,
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
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="عدد الطلبيات"
          value={ordersMetaData.count || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="المبلغ الكلي"
          value={ordersMetaData.totalCost || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="مبلغ التوصيل"
          value={ordersMetaData.deliveryCost || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="صافي العميل"
          value={ordersMetaData.clientNet || 0}
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="عدد طلبات الراجعة"
          value={
            ordersMetaData?.countByStatus?.find(
              (status) => status.status === 'RETURNED'
            )?.count || 0
          }
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="عدد الطلبات الواصلة"
          value={
            ordersMetaData?.countByStatus?.find(
              (status) => status.status === 'DELIVERED'
            )?.count || 0
          }
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <TextInput
          label="اجور توصيل بغداد"
          value={baghdadDeliveryCost}
          onChange={(e) => setBaghdadDeliveryCost(Number(e.target.value))}
          placeholder="اجور توصيل بغداد"
          type="number"
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <TextInput
          label="اجور توصيل المحافظات"
          value={governoratesDeliveryCost}
          onChange={(e) => setGovernoratesDeliveryCost(Number(e.target.value))}
          placeholder="اجور توصيل المحافظات"
          type="number"
        />
      </Grid.Col>
      <Grid.Col className="mt-6" span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <Button
          disabled={ordersLength === 0 || isLoading || !storeID}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف عميل
        </Button>
      </Grid.Col>
    </Grid>
  );
};
