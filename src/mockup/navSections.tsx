import {
  IconBox,
  IconLicense,
  IconUsers,
  IconUserCheck,
  IconBuildingStore,
  IconMapPins,
} from '@tabler/icons-react';

export const navSections = [
  { link: '/home', label: 'الطلبات', enLabel: 'orders', icon: IconBox },
  { link: '/home', label: 'الفواتير', enLabel: 'invoices', icon: IconLicense },
  { link: '/home', label: 'العملاء', enLabel: 'customers', icon: IconUsers },
  { link: '/home', label: 'المناطق', enLabel: 'regions', icon: IconMapPins },
  {
    link: '/employees',
    label: 'الموظفين',
    enLabel: 'employees',
    icon: IconUserCheck,
  },
  {
    link: '/home',
    label: 'المخازن',
    enLabel: 'stores',
    icon: IconBuildingStore,
  },
];
