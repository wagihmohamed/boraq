// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import {
  IconCheck,
  IconCoin,
  IconFileXFilled,
  IconLocationFilled,
  IconMan,
  IconPdf,
  IconStatusChange,
} from '@tabler/icons-react';
import { reportTypeArabicNames } from './reportTypeArabicNames';

export const orderTimelineTypeArabicNames = {
  STATUS_CHANGE: 'تغيير حالة الطلب',
  DELIVERY_AGENT_CHANGE: 'تغيير مندوب التوصيل',
  CURRENT_LOCATION_CHANGE: 'تغيير الموقع الحالي',
  ORDER_DELIVERY: 'توصيل الطلب',
  REPORT_CREATE: 'إنشاء كشف',
  REPORT_DELETE: 'حذف كشف',
  PAID_AMOUNT_CHANGE: 'تغيير المبلغ المدفوع',
};

export const renderTimelineDescription = ({
  type,
  old,
  new: newStatus,
  reportType,
}) => {
  switch (type) {
    case 'STATUS_CHANGE':
      return ` تم تغير حالة الطلب من ${orderStatusArabicNames[old]} الى${' '}
            ${orderStatusArabicNames[newStatus]}`;
    case 'CURRENT_LOCATION_CHANGE':
      return ` تم تغير موقع الطلب من ${old} الى ${newStatus}`;
    case 'DELIVERY_AGENT_CHANGE':
      return old.name
        ? ` تم تغير مندوب التوصيل من ${old.name} الى ${newStatus.name}`
        : ` تم تغير مندوب التوصيل الى ${newStatus.name}`;
    case 'ORDER_DELIVERY':
      return ` تم توصيل الطلب بنجاح`;
    case 'PAID_AMOUNT_CHANGE':
      return ` تم تغير مبلغ الطلب من ${old} الى ${newStatus}`;
    case 'REPORT_CREATE':
      return `تم انشاء كشف ${reportTypeArabicNames[reportType]}`;
    case 'REPORT_DELETE':
      return ` تم حذف كشف `;
    default:
      return null;
  }
};

export const orderTimelineIcons = {
  STATUS_CHANGE: <IconStatusChange size={23} />,
  DELIVERY_AGENT_CHANGE: <IconMan size={23} />,
  CURRENT_LOCATION_CHANGE: <IconLocationFilled size={23} />,
  ORDER_DELIVERY: <IconCheck size={23} />,
  REPORT_CREATE: <IconPdf size={23} />,
  REPORT_DELETE: <IconFileXFilled size={23} />,
  PAID_AMOUNT_CHANGE: <IconCoin size={23} />,
};
