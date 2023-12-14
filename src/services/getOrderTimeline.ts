import { api } from '@/api';
import { getOrderDetailsendpoint } from '@/api/apisUrl';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

// type OrderStatus = keyof typeof orderStatusArabicNames;

// interface StatusChange {
//   type: 'STATUS_CHANGE';
//   new: OrderStatus;
//   old: OrderStatus;
//   by: {
//     id: number;
//     name: string;
//     role: keyof typeof rolesArabicNames;
//   };
//   date: string;
// }

// interface DeliveryAgentChange {
//   type: 'DELIVERY_AGENT_CHANGE';
//   new: {
//     id: number;
//     name: string;
//   };
//   old: {
//     id: number;
//     name: string;
//   };
//   by: {
//     id: number;
//     name: string;
//     role: keyof typeof rolesArabicNames;
//   };
//   date: string;
// }

// interface CurrentLocationChange {
//   type: 'CURRENT_LOCATION_CHANGE';
//   new: string;
//   old: string;
//   by: {
//     id: number;
//     name: string;
//     role: keyof typeof rolesArabicNames;
//   };
//   date: string;
// }

// interface OrderDelivery {
//   type: 'ORDER_DELIVERY';
//   by: {
//     id: number;
//     name: string;
//     role: keyof typeof rolesArabicNames;
//   };
//   date: string;
// }

// interface ReportChange {
//   type: 'REPORT_CREATE' | 'REPORT_DELETE';
//   by: {
//     id: number;
//     name: string;
//     role: keyof typeof rolesArabicNames;
//   };
//   date: string;
//   reportID: number;
//   reportType: keyof typeof reportTypeArabicNames;
// }

// interface PaidAmountChange {
//   type: 'PAID_AMOUNT_CHANGE';
//   new: number;
//   old: number;
//   by: {
//     id: number;
//     name: string;
//     role: keyof typeof rolesArabicNames;
//   };
//   date: string;
// }

// export type OrderTimelineType =
//   | StatusChange
//   | DeliveryAgentChange
//   | CurrentLocationChange
//   | OrderDelivery
//   | ReportChange
//   | PaidAmountChange;

// interface OrderTimeline {
//   status: string;
//   data: OrderTimelineType[];
// }

export type OrderTimelineType =
  | 'STATUS_CHANGE'
  | 'DELIVERY_AGENT_CHANGE'
  | 'CURRENT_LOCATION_CHANGE'
  | 'ORDER_DELIVERY'
  | 'REPORT_CREATE'
  | 'REPORT_DELETE'
  | 'PAID_AMOUNT_CHANGE';

export const orderTimelineTypeArabicNames = {
  STATUS_CHANGE: 'تغيير حالة الطلب',
  DELIVERY_AGENT_CHANGE: 'تغيير مندوب التوصيل',
  CURRENT_LOCATION_CHANGE: 'تغيير الموقع الحالي',
  ORDER_DELIVERY: 'توصيل الطلب',
  REPORT_CREATE: 'إنشاء كشف',
  REPORT_DELETE: 'حذف كشف',
  PAID_AMOUNT_CHANGE: 'تغيير المبلغ المدفوع',
};

export interface OrderTimeline {
  status: string;
  data: {
    new: keyof typeof orderStatusArabicNames | number | string;
    old: keyof typeof orderStatusArabicNames | number | string;
    by: {
      id: number;
      name: string;
      role: keyof typeof rolesArabicNames;
    };
    date: string;
    type: OrderTimelineType;
    reportID: number | null;
    reportType: keyof typeof reportTypeArabicNames | null;
  }[];
}

export const getOrderTimeline = async (orderId: number) => {
  const response = await api.get<OrderTimeline>(
    `${getOrderDetailsendpoint}${orderId}/timeline`
  );
  return response.data;
};
