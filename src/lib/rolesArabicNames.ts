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
  SUPER_ADMIN: 'مدير عام',
  COMPANY_MANAGER: 'مدير شركة',
  ACCOUNT_MANAGER: 'مدير حسابات',
  ACCOUNTANT: 'محاسب',
  DELIVERY_AGENT: 'مندوب توصيل',
  RECEIVING_AGENT: 'مندوب استلام',
  BRANCH_MANAGER: 'مدير فرع',
  EMERGENCY_EMPLOYEE: 'موظف طوارئ',
  DATA_ENTRY: 'مدخل بيانات',
  REPOSITORIY_EMPLOYEE: 'موظف مخزن',
  INQUIRY_EMPLOYEE: 'موظف استفسارات',
  ADMIN: 'مدير',
  CLIENT: 'عميل',
  CLIENT_ASSISTANT: 'مساعد عميل',
};

export const rolesArray: { label: string; value: string }[] = Object.entries(
  Role
).map(([value, label]) => ({
  label,
  value,
}));
