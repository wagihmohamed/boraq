/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Timeline, Text, Loader } from '@mantine/core';
import { useOrderTimeline } from '@/hooks/useOrderTimeline';
import { IconStatusChange } from '@tabler/icons-react';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { format, parseISO } from 'date-fns';

export const OrderTimelineModal = ({ id }: { id: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: orderTimelineDate, isLoading } = useOrderTimeline(id);

  return (
    <>
      <Modal opened={opened} centered onClose={close} title="مسار الطلب">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <Loader />
          </div>
        ) : orderTimelineDate?.data.length === 0 ? (
          <div className="flex justify-center items-center h-64 w-full">
            <Text size="sm">لا يوجد مسار لهذا الطلب</Text>
          </div>
        ) : (
          <Timeline
            bulletSize={24}
            lineWidth={2}
            active={orderTimelineDate?.data.length}
          >
            {orderTimelineDate?.data.map((item) => (
              <Timeline.Item
                key={item.date}
                bullet={<IconStatusChange size={12} />}
                lineVariant="dashed"
                title={
                  item.type === 'STATUS_CHANGE'
                    ? 'تغير حالة الطلب'
                    : 'تغير حالة الطلب'
                }
              >
                <Text c="dimmed" size="sm">
                  تم تغير حالة الطلب من {orderStatusArabicNames[item.old]} الى{' '}
                  {orderStatusArabicNames[item.new]}
                </Text>
                <Text size="xs" mt={4}>
                  {format(parseISO(item.date), 'yyyy-MM-dd HH:mm:ss')}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </Modal>

      <Button fullWidth variant="outline" mb={8} onClick={open}>
        تاريخ الطلب
      </Button>
    </>
  );
};
