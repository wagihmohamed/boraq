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
  IconFileTypePdf,
  IconChartPie3,
  IconTrashFilled,
  IconPhotoFilled,
  IconTruckDelivery,
  IconPackages,
  IconFileSpreadsheet,
  IconRefresh,
} from '@tabler/icons-react';

export const navSections = [
  {
    link: '/statistics',
    label: 'الاحصائيات',
    enLabel: 'statistics',
    icon: IconChartPie3,
  },
  { link: '/home', label: 'المنتجات', enLabel: 'home', icon: IconBox },
  {
    link: '/orders',
    label: 'الطلبات',
    enLabel: 'invoices',
    icon: IconPackageExport,
  },
  {
    link: '/orders-bulk-create',
    label: 'انشاء طلبات جماعية',
    enLabel: 'orders bulk create',
    icon: IconPackages,
  },
  {
    link: '/orders-sheet',
    label: 'استيراد طلبات من اكسل',
    enLabel: 'orders sheet',
    icon: IconFileSpreadsheet,
  },
  {
    link: '/orders-auto-apdate',
    label: 'التحديث التلقائي للطلبات',
    enLabel: 'orders auto update',
    icon: IconRefresh,
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
    link: '/reports',
    label: 'الكشوفات',
    enLabel: 'reports',
    icon: IconFileTypePdf,
  },
  {
    link: '/locations',
    label: 'المناطق',
    enLabel: 'regions',
    icon: IconMapPins,
  },
  {
    link: '/agents-manifest',
    label: 'منافيست المندوبين',
    enLabel: 'agents manifest',
    icon: IconTruckDelivery,
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
    link: '/banners',
    label: 'البنرات',
    enLabel: 'banners',
    icon: IconPhotoFilled,
  },
  {
    link: '/deleted',
    label: 'المحذوفات',
    enLabel: 'deleted',
    icon: IconTrashFilled,
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
