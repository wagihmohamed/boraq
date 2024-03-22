import { OrdersFilter, OrdersMetaData } from '@/services/getOrders';
import { StatisticsItem } from '../../StatisticsItem';
import { Button, Grid, NumberInput } from '@mantine/core';
import { useCreateReport } from '@/hooks/useCreateReport';
import toast from 'react-hot-toast';
import { CreateReportPayload } from '@/services/createReport';
import { useState } from 'react';

interface BranchesOrdersStatisticsProps {
  ordersParams: OrdersFilter;
  branchId: string;
  ordersMetaData: OrdersMetaData;
  ordersLength: number;
}

export const BranchesOrdersStatistics = ({
  ordersParams,
  branchId,
  ordersMetaData,
  ordersLength,
}: BranchesOrdersStatisticsProps) => {
  const [governoratesDeliveryCost, setGovernoratesDeliveryCost] = useState<
    string | number
  >(0);
  const { mutateAsync: createReport, isLoading } = useCreateReport();

  const handleCreateReport = () => {
    if (!governoratesDeliveryCost) {
      toast.error('الرجاء ادخال اجور التوصيل');
      return;
    }
    const mutationParams: CreateReportPayload = {
      ordersIDs: '*',
      params: ordersParams,
      type: 'BRANCH',
      branchID: Number(branchId),
      governoratesDeliveryCost: Number(governoratesDeliveryCost),
    };
    toast.promise(
      createReport(mutationParams, {
        onSuccess: () => {
          setGovernoratesDeliveryCost(0);
        },
      }),
      {
        loading: 'جاري تصدير الكشف',
        success: 'تم تصدير الكشف بنجاح',
        error: (error) => error.message || 'حدث خطأ ما',
      }
    );
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
      <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
        <NumberInput
          label="اجور توصيل المحافظات"
          value={governoratesDeliveryCost}
          onChange={(e) => setGovernoratesDeliveryCost(e)}
          placeholder="اجور توصيل المحافظات"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
        <Button
          disabled={ordersLength === 0 || isLoading || !branchId}
          onClick={handleCreateReport}
          loading={isLoading}
        >
          انشاء كشف فرع
        </Button>
      </Grid.Col>
    </Grid>
  );
};
