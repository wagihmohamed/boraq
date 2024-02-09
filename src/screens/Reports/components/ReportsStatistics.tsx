import { Grid } from '@mantine/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportsMetaData } from '@/services/getReports';

interface ReportsStatisticsProps {
  reportsMetaData?: ReportsMetaData;
}

export const ReportsStatistics = ({
  reportsMetaData,
}: ReportsStatisticsProps) => {
  return (
    <Grid grow>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد الكشوفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.reportsCount || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              التكلفة الكلية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.totalCost || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المبلغ المدفوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.paidAmount || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تكلفة التوصيل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.deliveryCost || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي العميل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.clientNet || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              عدد طلبات بغداد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.baghdadOrdersCount || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              عدد طلبات المحافظات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.governoratesOrdersCount || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي الشركة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.companyNet || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي المندوب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.deliveryAgentNet || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 2 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد الكشوفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportsMetaData?.reportsCount || 0}
            </div>
          </CardContent>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
