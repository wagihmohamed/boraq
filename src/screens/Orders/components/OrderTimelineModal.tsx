/* eslint-disable no-nested-ternary */
import { Modal, Button, Timeline, Text, Loader } from '@mantine/core';
import { useOrderTimeline } from '@/hooks/useOrderTimeline';
import { format, parseISO } from 'date-fns';
import { orderTimelineTypeArabicNames } from '@/services/getOrderTimeline';
import {
  orderTimelineIcons,
  renderTimelineDescription,
} from '../../../lib/orderTimelineArabicNames';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';

interface Props {
  id: number;
  opened: boolean;
  close: () => void;
  open: () => void;
  closeMenu: () => void;
}

export const OrderTimelineModal = ({
  id,
  close,
  open,
  opened,
  closeMenu,
}: Props) => {
  const { data: orderTimelineDate, isLoading } = useOrderTimeline(id);

  const handleClose = () => {
    close();
    closeMenu();
  };

  return (
    <>
      <Modal
        withinPortal
        opened={opened}
        centered
        onClose={handleClose}
        title="مسار الطلب"
      >
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
                bullet={orderTimelineIcons[item.type]}
                lineVariant="dashed"
                title={
                  orderTimelineTypeArabicNames[item.type] === 'STATUS_CHANGE' &&
                  item.reportType
                    ? `تم تغير حالة الطلب الي ${
                        reportTypeArabicNames[item.reportType]
                      }`
                    : orderTimelineTypeArabicNames[item.type]
                }
              >
                {renderTimelineDescription({
                  old: item?.old,
                  new: item?.new,
                  type: item.type,
                  reportType: item?.reportType,
                  by: item?.by,
                  message: item?.message,
                })}
                <Text size="xs" mt={4}>
                  {format(parseISO(item.date), 'yyyy-MM-dd HH:mm:ss')}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </Modal>

      <Button fullWidth variant="outline" mb={8} onClick={open}>
        سجل التعديلات
      </Button>
    </>
  );
};
