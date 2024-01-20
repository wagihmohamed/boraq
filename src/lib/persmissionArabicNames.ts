enum Permission {
  ADD_STORE = 'اضافة متجر',
  ADD_CLIENT = ' اضافة عميل',
  ADD_LOCATION = ' اضافة منطقة',
  ADD_DELIVERY_AGENT = 'اضافة مندوب',
  ADD_ORDER = ' اضافة طلبة',
  DELETE_ORDER = ' مسح طلبية',
  CHANGE_ORDER_STATUS = 'تغيير حالة طلبية',
  CHANGE_CLOSED_ORDER_STATUS = 'تغيير حالة طلبية مغلقة',
  CHANGE_ORDER_TOTAL_AMOUNT = 'تعديل المبلغ الكلي لطلبية',
  LOCK_ORDER_STATUS = 'قفل حالة طلبية',

  CHANGE_ORDER_DELIVERY_AGENT = 'احالة طلبية من مندوب الي اخر',
  CHANGE_ORDER_BRANCH = 'احالة طلبية من فرع الي اخر',
  CHANGE_ORDER_CLIENT = 'احالة طلبية من عميل الي اخر',
  CHANGE_ORDER_COMPANY = 'احالة طلبية من شركة الي اخرى',

  CREATE_DELIVERY_AGENT_REPORT = 'انشاء كشف مندوب',
  CREATE_CLIENT_REPORT = 'انشاء كشف عميل',
  CREATE_REPOSITORY_REPORT = 'انشاء كشف مخزن',
  CREATE_COMPANY_REPORT = 'انشاء كشف شركة',
  CREATE_GOVERNMENT_REPORT = 'انشاء كشف محافظة',
  CREATE_BRANCH_REPORT = 'انشاء كشف فرع',

  DELETE_COMPANY_REPORT = 'مسح كشف شركة',
  DELETE_REPOSITORIES_REPORT = 'مسح كشف مخزن',
  DELETE_GOVERNMENT_REPORT = 'مسح كشف محافظة',
  DELETE_DELIVERY_AGENT_REPORT = 'مسح كشف مندوب',
  DELETE_CLIENT_REPORT = 'مسح كشف عميل',
  DELETE_BRANCH_REPORT = 'مسح كشف فرع',
}

export const permissionsArabicNames = {
  ADD_STORE: 'اضافة متجر',
  ADD_CLIENT: ' اضافة عميل',
  ADD_LOCATION: ' اضافة منطقة',
  ADD_DELIVERY_AGENT: 'اضافة مندوب',
  ADD_ORDER: ' اضافة طلبة',
  DELETE_ORDER: ' مسح طلبية',
  CHANGE_ORDER_STATUS: 'تغيير حالة طلبية',
  CHANGE_CLOSED_ORDER_STATUS: 'تغيير حالة طلبية مغلقة',
  CHANGE_ORDER_TOTAL_AMOUNT: 'تعديل المبلغ الكلي لطلبية',
  LOCK_ORDER_STATUS: 'قفل حالة طلبية',

  CHANGE_ORDER_DELIVERY_AGENT: 'احالة طلبية من مندوب الي اخر',
  CHANGE_ORDER_BRANCH: 'احالة طلبية من فرع الي اخر',
  CHANGE_ORDER_CLIENT: 'احالة طلبية من عميل الي اخر',
  CHANGE_ORDER_COMPANY: 'احالة طلبية من شركة الي اخرى',

  CREATE_DELIVERY_AGENT_REPORT: 'انشاء كشف مندوب',
  CREATE_CLIENT_REPORT: 'انشاء كشف عميل',
  CREATE_REPOSITORY_REPORT: 'انشاء كشف مخزن',
  CREATE_COMPANY_REPORT: 'انشاء كشف شركة',
  CREATE_GOVERNMENT_REPORT: 'انشاء كشف محافظة',
  CREATE_BRANCH_REPORT: 'انشاء كشف فرع',

  DELETE_COMPANY_REPORT: 'مسح كشف شركة',
  DELETE_REPOSITORIES_REPORT: 'مسح كشف مخزن',
  DELETE_GOVERNMENT_REPORT: 'مسح كشف محافظة',
  DELETE_DELIVERY_AGENT_REPORT: 'مسح كشف مندوب',
  DELETE_CLIENT_REPORT: 'مسح كشف عميل',
  DELETE_BRANCH_REPORT: 'مسح كشف فرع',
};

export const permissionsArray: { label: string; value: string }[] =
  Object.entries(Permission).map(([value, label]) => ({
    label,
    value,
  }));
