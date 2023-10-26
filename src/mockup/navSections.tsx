import {
  IconBox,
  IconUsers,
  IconUserCheck,
  IconBuildingStore,
  IconMapPins,
  IconBuildingCommunity,
  IconNeedle,
  IconColorFilter,
  IconCategoryFilled,
  IconShoppingBag,
  IconPackageExport,
} from '@tabler/icons-react';

export const navSections = [
  { link: '/home', label: 'المنتجات', enLabel: 'home', icon: IconBox },
  {
    link: '/orders',
    label: 'الطلبات',
    enLabel: 'invoices',
    icon: IconPackageExport,
  },
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
    enLabel: 'repositories',
    icon: IconBuildingStore,
  },
  {
    link: '/stores',
    label: 'المتاجر',
    enLabel: 'stores',
    icon: IconShoppingBag,
  },
  {
    link: '/categories',
    label: 'الاصناف',
    enLabel: 'categories',
    icon: IconCategoryFilled,
  },
  {
    link: '/sizes',
    label: 'الاحجام',
    enLabel: 'sizes',
    icon: IconNeedle,
  },
  {
    link: '/colors',
    label: 'الالوان',
    enLabel: 'colors',
    icon: IconColorFilter,
  },
];
