import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid, TextInput } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';
// eslint-disable-next-line import/no-cycle
import { deliveryAgentInitialStatuses } from '.';
import { useState } from 'react';

interface DeliveryAgentOrdersStatisticsProps {
  ordersParams: OrdersFilter;
  ordersLength: number;
  deliveryAgentID: string;
  ordersMetaData: OrdersMetaData;
}

export const DeliveryAgentStatistics = ({
  ordersLength,
  ordersParams,
  deliveryAgentID,
  ordersMetaData,
}: DeliveryAgentOrdersStatisticsProps) => {
  const [deliveryAgentDeliveryCost, setDeliveryAgentDeliveryCost] =
    useState<number>();

  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const handleCreateReport = () => {
    const mutationParams: CreateReportPayload = {
      ordersIDs: '*',
      params: {
        ...ordersParams,
        statuses: ordersParams.statuses?.length
          ? ordersParams.statuses
          : deliveryAgentInitialStatuses,
      },
      type: 'DELIVERY_AGENT',
      deliveryAgentID: Number(deliveryAgentID),
    };

    toast.promise(createReport(mutationParams), {
      loading: 'جاري تصدير الكشف',
      success: 'تم تصدير الكشف بنجاح',
      error: (error) => error.message || 'حدث خطأ ما',
    });
  };
  return (
    <Grid align="center" className="mt-4" grow>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem title="عدد الطلبيات" value={ordersMetaData.count} />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem title="المبلغ الكلي" value={ordersMetaData.totalCost} />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem
          title="مبلغ التوصيل"
          value={ordersMetaData.deliveryCost}
        />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <StatisticsItem title="صافي العميل" value={ordersMetaData.clientNet} />
      </Grid.Col>
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <TextInput
          label="اجور توصيل المندوب"
          value={deliveryAgentDeliveryCost}
          onChange={(e) => setDeliveryAgentDeliveryCost(Number(e.target.value))}
          placeholder="اجور توصيل المندوب"
          type="number"
        />
      </Grid.Col>
      <Grid.Col className="mt-6" span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <Button
          disabled={ordersLength === 0 || isLoading || !deliveryAgentID}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف مندوب توصيل
        </Button>
      </Grid.Col>
    </Grid>
  );
};
