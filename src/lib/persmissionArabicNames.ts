enum Permission {
  ADD_ORDER_TO_DRIVER = 'اضافة طلب للسائق',
  ADD_PAGE = 'اضافة صفحة',
  ADD_ORDER = 'اضافة طلب',
  ADD_CLIENT = 'اضافة عميل',
  EDIT_CLIENT_NAME = 'تعديل اسم العميل',
  EDIT_ORDER_TOTAL_AMOUNT = 'تعديل اجمالي مبلغ الطلب',
  CHANGE_ORDER_STATUS = 'تغيير حالة الطلب',
  CHANGE_CLOSED_ORDER_STATUS = 'تغيير حالة الطلب المغلق',
  LOCK_ORDER_STATUS = 'قفل حالة الطلب',
  DELETE_PRICES = 'حذف الاسعار',
  DELETE_ORDERS = 'حذف الطلبات',
  DELETE_REPORTS = 'حذف التقارير',
  DELETE_COMPANY_REPORTS = 'حذف تقارير الشركة',
  DELETE_REPOSITORIES_REPORTS = 'حذف تقارير المستودعات',
  DELETE_GOVERNMENT_REPORTS = 'حذف تقارير الحكومة',
  DELETE_DRIVER_REPORTS = 'حذف تقارير السائق',
}

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
  DELETE_REPOSITORIES_REPORTS: 'حذف تقارير المستودعات',
  DELETE_GOVERNMENT_REPORTS: 'حذف تقارير الحكومة',
  DELETE_DRIVER_REPORTS: 'حذف تقارير السائق',
};

export const permissionsArray: { label: string; value: string }[] =
  Object.entries(Permission).map(([value, label]) => ({
    label,
    value,
  }));
