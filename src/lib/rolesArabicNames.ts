enum Role {
  SUPER_ADMIN = 'سوبر ادمن',
  COMPANY_MANAGER = 'مدير شركة',
  ACCOUNT_MANAGER = 'مدير حسابات',
  ACCOUNTANT = 'محاسب',
  DELIVERY_AGENT = 'مندوب توصيل',
  RECEIVING_AGENT = 'مندوب استلام',
  BRANCH_MANAGER = 'مدير فرع',
  EMERGENCY_EMPLOYEE = 'موظف طوارئ',
  DATA_ENTRY = 'مدخل بيانات',
  REPOSITORIY_EMPLOYEE = 'موظف مخزن',
  INQUIRY_EMPLOYEE = 'موظف استفسارات',
  ADMIN = 'ادمن',
  CLIENT = 'عميل',
  CLIENT_ASSISTANT = 'مساعد عميل',
}

export const rolesArabicNames = {
  SUPER_ADMIN: 'مدير عام', // done
  COMPANY_MANAGER: 'مدير شركة', // done
  ACCOUNT_MANAGER: 'مدير حسابات', // need to clarify
  ACCOUNTANT: 'محاسب', // done
  DELIVERY_AGENT: 'مندوب توصيل', // won't use the dashboard
  RECEIVING_AGENT: 'مندوب استلام', // won't use the dashboard
  BRANCH_MANAGER: 'مدير فرع', // done
  EMERGENCY_EMPLOYEE: 'موظف طوارئ', // need to clarify
  DATA_ENTRY: 'مدخل بيانات', // done
  REPOSITORIY_EMPLOYEE: 'موظف مخزن', // done
  INQUIRY_EMPLOYEE: 'موظف استفسارات', // need to clarify
  ADMIN: 'مدير', // done
  CLIENT: 'عميل', // done
  CLIENT_ASSISTANT: 'مساعد عميل',
};

export const rolesArray: { label: string; value: string }[] = Object.entries(
  Role
).map(([value, label]) => ({
  label,
  value,
}));
