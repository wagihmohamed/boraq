import { rolesArabicNames } from '@/lib/rolesArabicNames';
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

interface NavSection {
  link: string;
  label: string;
  enLabel: string;
  icon: typeof IconBox;
  roles: (keyof typeof rolesArabicNames)[];
}

export const navSections: NavSection[] = [
  {
    link: '/statistics',
    label: 'الاحصائيات',
    enLabel: 'statistics',
    icon: IconChartPie3,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
  {
    link: '/home',
    label: 'المنتجات',
    enLabel: 'home',
    icon: IconBox,
    roles: ['SUPER_ADMIN', 'DATA_ENTRY', 'COMPANY_MANAGER'],
  },
  {
    link: '/orders',
    label: 'الطلبات',
    enLabel: 'invoices',
    icon: IconPackageExport,
    roles: Object.keys(rolesArabicNames) as (keyof typeof rolesArabicNames)[],
  },
  {
    link: '/orders-bulk-create',
    label: 'انشاء طلبات جماعية',
    enLabel: 'orders bulk create',
    icon: IconPackages,
    roles: ['SUPER_ADMIN', 'ACCOUNTANT', 'DATA_ENTRY'],
  },
  {
    link: '/orders-sheet',
    label: 'استيراد طلبات من اكسل',
    enLabel: 'orders sheet',
    icon: IconFileSpreadsheet,
    roles: ['SUPER_ADMIN', 'DATA_ENTRY'],
  },
  {
    link: '/orders-auto-apdate',
    label: 'التحديث التلقائي للطلبات',
    enLabel: 'orders auto update',
    icon: IconRefresh,
    roles: ['COMPANY_MANAGER'],
  },
  {
    link: '/clients',
    label: 'العملاء',
    enLabel: 'clients',
    icon: IconUsers,
    roles: ['SUPER_ADMIN', 'ACCOUNTANT', 'DATA_ENTRY', 'BRANCH_MANAGER'],
  },
  {
    link: '/branches',
    label: 'الفروع',
    enLabel: 'branches',
    icon: IconUsers,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
  {
    link: '/tenants',
    label: 'الشركات',
    enLabel: 'tenants',
    icon: IconBuildingCommunity,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
  {
    link: '/reports',
    label: 'الكشوفات',
    enLabel: 'reports',
    icon: IconFileTypePdf,
    roles: [
      'SUPER_ADMIN',
      'BRANCH_MANAGER',
      'ACCOUNTANT',
      'REPOSITORIY_EMPLOYEE',
    ],
  },
  {
    link: '/locations',
    label: 'المناطق',
    enLabel: 'regions',
    icon: IconMapPins,
    roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'ACCOUNTANT', 'DATA_ENTRY'],
  },
  {
    link: '/agents-manifest',
    label: 'منافيست المندوبين',
    enLabel: 'agents manifest',
    icon: IconTruckDelivery,
    roles: ['SUPER_ADMIN', 'ACCOUNTANT', 'BRANCH_MANAGER', 'DATA_ENTRY'],
  },
  {
    link: '/employees',
    label: 'الموظفين',
    enLabel: 'employees',
    icon: IconUserCheck,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'], // SHOULD ADD A NEW SCREEN TO ADD EMPLOYEES TO THE BRANCH MANAGER
  },
  {
    link: '/repositories',
    label: 'المخازن',
    enLabel: 'repositories',
    icon: IconBuildingStore,
    roles: [
      'SUPER_ADMIN',
      'REPOSITORIY_EMPLOYEE',
      'BRANCH_MANAGER',
      'ACCOUNTANT',
    ],
  },
  {
    link: '/stores',
    label: 'المتاجر',
    enLabel: 'stores',
    icon: IconShoppingBag,
    roles: ['SUPER_ADMIN', 'DATA_ENTRY', 'ACCOUNTANT', 'BRANCH_MANAGER'],
  },
  {
    link: '/banners',
    label: 'البنرات',
    enLabel: 'banners',
    icon: IconPhotoFilled,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
  {
    link: '/deleted',
    label: 'المحذوفات',
    enLabel: 'deleted',
    icon: IconTrashFilled,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
  {
    link: '/categories',
    label: 'الاصناف',
    enLabel: 'categories',
    icon: IconCategoryFilled,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
  {
    link: '/sizes',
    label: 'الاحجام',
    enLabel: 'sizes',
    icon: IconNeedle,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
  {
    link: '/colors',
    label: 'الالوان',
    enLabel: 'colors',
    icon: IconColorFilter,
    roles: ['SUPER_ADMIN', 'COMPANY_MANAGER'],
  },
];
