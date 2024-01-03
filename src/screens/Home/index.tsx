import { AppLayout } from '@/components/AppLayout';
import { useOrdersStatistics } from '@/hooks/useOrdersStatistics';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { OrdersStatistics } from '@/services/getOrdersStatisticsService';
import {
  Center,
  Grid,
  Group,
  Paper,
  RingProgress,
  Skeleton,
  Text,
  rem,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const statusColors = [
  'rgba(255, 0, 0, 1)',
  'rgba(0, 255, 0, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(255, 255, 0, 1)',
  'rgba(255, 0, 255, 1)',
  'rgba(0, 255, 255, 1)',
  'rgba(128, 0, 128, 1)',
  'rgba(255, 165, 0, 1)',
  'rgba(0, 128, 0, 1)',
  'rgba(128, 128, 0, 1)',
  'rgba(0, 128, 128, 1)',
  'rgba(128, 0, 0, 1)',
];

export const pieChartData = ({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}): ChartData<'pie', number[], string> => {
  return {
    labels,
    datasets: [
      {
        label: 'عدد الطلبات',
        data,
        backgroundColor: statusColors,
        borderColor: statusColors.map((color) => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };
};

export interface CustomPieChartProps {
  labels: string[];
  data: number[];
  additionalData:
    | OrdersStatistics['ordersStatisticsByStatus']
    | OrdersStatistics['ordersStatisticsByGovernorate'];
}

export const CustomPieChart = ({
  data,
  labels,
  additionalData,
}: CustomPieChartProps) => {
  const getTotalCostBuyDataIndex = (index: number) => {
    if (additionalData && additionalData[index]) {
      const dataAtIndex = additionalData[index];
      if ('totalCost' in dataAtIndex) {
        return dataAtIndex.totalCost;
      }
    }
    return '';
  };
  return (
    <Pie
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            rtl: true,
          },
          tooltip: {
            rtl: true,
            callbacks: {
              label: (context) => {
                const label = labels[context.dataIndex];
                const value = data[context.dataIndex];
                return `${label}: ${value} طلب , التكلفة ${getTotalCostBuyDataIndex(
                  context.dataIndex
                )}`;
              },
            },
          },
        },
      }}
      width={rem(600)}
      height={rem(600)}
      data={pieChartData({ labels, data })}
    />
  );
};

export const Home = () => {
  const { data: ordersStatistics, isError, isLoading } = useOrdersStatistics();
  const ordersStatusStatistics =
    ordersStatistics?.data.ordersStatisticsByStatus;

  const ordersGovernorateStatistics =
    ordersStatistics?.data.ordersStatisticsByGovernorate;

  return (
    <AppLayout isError={isError} isLoading={isLoading}>
      <Grid gutter="lg" className="mt-10 px-2">
        <Grid.Col className="h-120" span={{ sm: 12, md: 6 }}>
          <Paper withBorder radius="md" p="xs" className="w-full h-full">
            <CustomPieChart
              data={ordersStatusStatistics?.map((item) => item.count) || []}
              labels={
                ordersStatusStatistics?.map(
                  (item) => orderStatusArabicNames[item.status]
                ) || []
              }
              additionalData={ordersStatusStatistics || []}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col className="h-120" span={{ sm: 12, md: 6 }}>
          <Paper withBorder radius="md" p="xs" className="w-full h-full">
            <CustomPieChart
              data={
                ordersGovernorateStatistics?.map((item) => item.count) || []
              }
              labels={
                ordersGovernorateStatistics?.map(
                  (item) => governorateArabicNames[item.governorate]
                ) || []
              }
              additionalData={ordersGovernorateStatistics || []}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col className="mt-4" span={{ sm: 12, md: 6 }}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: 72, color: 'teal' }]}
                label={
                  <Center>
                    <IconArrowUpRight
                      style={{ width: rem(20), height: rem(20) }}
                      stroke={1.5}
                    />
                  </Center>
                }
              />

              <div>
                <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                  التكلفة الكلية
                </Text>
                <Text fw={700} size="xl">
                  {ordersStatistics?.data.allOrdersStatistics.totalCost}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col className="mt-4" span={{ sm: 12, md: 6 }}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: 65, color: 'blue' }]}
                label={
                  <Center>
                    <IconArrowUpRight
                      style={{ width: rem(20), height: rem(20) }}
                      stroke={1.5}
                    />
                  </Center>
                }
              />

              <div>
                <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                  العدد الكلي للطلبات
                </Text>
                <Text fw={700} size="xl">
                  {ordersStatistics?.data.allOrdersStatistics.count}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col className="mt-4" span={{ sm: 12, md: 6 }}>
          {isLoading ? (
            <Skeleton height="100%" />
          ) : (
            <Paper withBorder radius="md" p="xs">
              <Group>
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[{ value: 65, color: 'red' }]}
                  label={
                    <Center>
                      <IconArrowUpRight
                        style={{ width: rem(20), height: rem(20) }}
                        stroke={1.5}
                      />
                    </Center>
                  }
                />

                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    العدد الكلي للطلبات اليوم
                  </Text>
                  <Text fw={700} size="xl">
                    {ordersStatistics?.data.todayOrdersStatistics.count}
                  </Text>
                </div>
              </Group>
            </Paper>
          )}
        </Grid.Col>
        <Grid.Col className="mt-4" span={{ sm: 12, md: 6 }}>
          {isLoading ? (
            <Skeleton height="100%" />
          ) : (
            <Paper withBorder radius="md" p="xs">
              <Group>
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[{ value: 65, color: 'violet' }]}
                  label={
                    <Center>
                      <IconArrowUpRight
                        style={{ width: rem(20), height: rem(20) }}
                        stroke={1.5}
                      />
                    </Center>
                  }
                />

                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    اجمالي التكلفة اليوم
                  </Text>
                  <Text fw={700} size="xl">
                    {ordersStatistics?.data.todayOrdersStatistics.totalCost}
                  </Text>
                </div>
              </Group>
            </Paper>
          )}
        </Grid.Col>
        <Grid.Col className="mt-4" span={{ sm: 12, md: 6 }}>
          {isLoading ? (
            <Skeleton height="100%" />
          ) : (
            <Paper withBorder radius="md" p="xs">
              <Group>
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[{ value: 65, color: 'yellow' }]}
                  label={
                    <Center>
                      <IconArrowUpRight
                        style={{ width: rem(20), height: rem(20) }}
                        stroke={1.5}
                      />
                    </Center>
                  }
                />

                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    احصائيات الطلبات بدون كشف عميل
                  </Text>
                  <Text fw={700} size="xl">
                    {
                      ordersStatistics?.data
                        .allOrdersStatisticsWithoutClientReport.totalCost
                    }
                  </Text>
                </div>
              </Group>
            </Paper>
          )}
        </Grid.Col>
        <Grid.Col className="mt-4" span={{ sm: 12, md: 6 }}>
          {isLoading ? (
            <Skeleton height="100%" />
          ) : (
            <Paper withBorder radius="md" p="xs">
              <Group>
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[{ value: 65, color: 'cyan' }]}
                  label={
                    <Center>
                      <IconArrowUpRight
                        style={{ width: rem(20), height: rem(20) }}
                        stroke={1.5}
                      />
                    </Center>
                  }
                />

                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    عدد احصائيات الطلبات بدون كشف عميل
                  </Text>
                  <Text fw={700} size="xl">
                    {
                      ordersStatistics?.data
                        .allOrdersStatisticsWithoutClientReport.count
                    }
                  </Text>
                </div>
              </Group>
            </Paper>
          )}
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};
