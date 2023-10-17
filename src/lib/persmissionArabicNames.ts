enum Permission {
  ADD_ORDER_TO_DRIVER = 'ADD_ORDER_TO_DRIVER',
  ADD_PAGE = 'ADD_PAGE',
  ADD_ORDER = 'ADD_ORDER',
  ADD_CLIENT = 'ADD_CLIENT',
  EDIT_CLIENT_NAME = 'EDIT_CLIENT_NAME',
  EDIT_ORDER_TOTAL_AMOUNT = 'EDIT_ORDER_TOTAL_AMOUNT',
  CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS',
  CHANGE_CLOSED_ORDER_STATUS = 'CHANGE_CLOSED_ORDER_STATUS',
  LOCK_ORDER_STATUS = 'LOCK_ORDER_STATUS',
  DELETE_PRICES = 'DELETE_PRICES',
  DELETE_ORDERS = 'DELETE_ORDERS',
  DELETE_REPORTS = 'DELETE_REPORTS',
  DELETE_COMPANY_REPORTS = 'DELETE_COMPANY_REPORTS',
  DELETE_STORE_REPORTS = 'DELETE_STORE_REPORTS',
  DELETE_GOVERNMENT_REPORTS = 'DELETE_GOVERNMENT_REPORTS',
  DELETE_DRIVER_REPORTS = 'DELETE_DRIVER_REPORTS',
}

export const permissionsArray: { label: string; value: string }[] =
  Object.entries(Permission).map(([value, label]) => ({
    label,
    value,
  }));

export const permissionsArabicNames = {
  ADD_ORDER_TO_DRIVER: 'إضافة طلب للسائق',
  ADD_PAGE: 'إضافة صفحة',
  ADD_ORDER: 'إضافة طلب',
  ADD_CLIENT: 'إضافة عميل',
  EDIT_CLIENT_NAME: 'تعديل اسم العميل',
  EDIT_ORDER_TOTAL_AMOUNT: 'تعديل إجمالي مبلغ الطلب',
  CHANGE_ORDER_STATUS: 'تغيير حالة الطلب',
  CHANGE_CLOSED_ORDER_STATUS: 'تغيير حالة الطلب المغلق',
  LOCK_ORDER_STATUS: 'قفل حالة الطلب',
  DELETE_PRICES: 'حذف الأسعار',
  DELETE_ORDERS: 'حذف الطلبات',
  DELETE_REPORTS: 'حذف التقارير',
  DELETE_COMPANY_REPORTS: 'حذف تقارير الشركة',
  DELETE_STORE_REPORTS: 'حذف تقارير المخزن',
  DELETE_GOVERNMENT_REPORTS: 'حذف تقارير الحكومة',
  DELETE_DRIVER_REPORTS: 'حذف تقارير السائق',
};
