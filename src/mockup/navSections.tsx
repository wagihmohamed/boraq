import {
  IconBox,
  IconLicense,
  IconUsers,
  IconUserCheck,
  IconBuildingStore,
  IconMapPins,
  IconBuildingCommunity,
} from '@tabler/icons-react';

export const navSections = [
  { link: '/home', label: 'الطلبات', enLabel: 'home', icon: IconBox },
  { link: '/home', label: 'الفواتير', enLabel: 'invoices', icon: IconLicense },
  { link: '/clients', label: 'العملاء', enLabel: 'clients', icon: IconUsers },
  { link: '/branches', label: 'الفروع', enLabel: 'branches', icon: IconUsers },
  {
    link: '/tenants',
    label: 'الشركات',
    enLabel: 'tenants',
    icon: IconBuildingCommunity,
  },
  {
    link: '/locations',
    label: 'المناطق',
    enLabel: 'regions',
    icon: IconMapPins,
  },
  {
    link: '/employees',
    label: 'الموظفين',
    enLabel: 'employees',
    icon: IconUserCheck,
  },
  {
    link: '/repositories',
    label: 'المخازن',
    enLabel: 'stores',
    icon: IconBuildingStore,
  },
];
