export const withReportsDataOptions = [
  {
    label: 'بدون كشف',
    value: '0',
  },
  {
    label: 'مع كشف',
    value: '1',
  },
];

export const getReportParam = (value?: string | null): boolean => {
  if (value === '1') return true;
  return false;
};
