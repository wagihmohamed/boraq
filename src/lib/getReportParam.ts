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

export const getReportParam = (value?: string | null): boolean | undefined => {
  if (value === '1') return true;
  if (value === '0') return false;
  return undefined;
};
