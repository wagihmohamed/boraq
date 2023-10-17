enum Role {
  SUPER_ADMIN = 'مدير عام',
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
};

export const rolesArray: { label: string; value: string }[] = Object.entries(
  Role
).map(([value, label]) => ({
  label,
  value,
}));
