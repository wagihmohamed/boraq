import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { JWTRole } from '@/store/authStore';
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
  IconArrowBackUp,
  IconCheck,
  IconCoin,
  IconSend,
  IconPlayerTrackNext,
} from '@tabler/icons-react';

interface NavSection {
  link: string;
  label: string;
  enLabel: string;
  icon: typeof IconBox;
  roles: JWTRole[];
}

export const navSections: NavSection[] = [
  {
    link: '/statistics',
    label: 'الاحصائيات',
    enLabel: 'statistics',
    icon: IconChartPie3,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER', 'CLIENT'],
  },
  {
    link: '/home',
    label: 'المنتجات',
    enLabel: 'home',
    icon: IconBox,
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'DATA_ENTRY',
      'COMPANY_MANAGER',
      'CLIENT',
      'CLIENT_ASSISTANT',
    ],
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
    label: 'انشاء طلب',
    enLabel: 'orders bulk create',
    icon: IconPackages,
    roles: ['ACCOUNTANT', 'DATA_ENTRY', 'COMPANY_MANAGER'],
  },
  {
    link: '/orders-bulk-create',
    label: 'انشاء طلب',
    enLabel: 'orders bulk create',
    icon: IconPackages,
    roles: ['CLIENT'],
  },
  {
    link: '/orders-sheet',
    label: 'استيراد طلبات من اكسل',
    enLabel: 'orders sheet',
    icon: IconFileSpreadsheet,
    roles: ['DATA_ENTRY', 'COMPANY_MANAGER'],
  },
  {
    link: '/orders-auto-update',
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
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'ACCOUNTANT',
      'DATA_ENTRY',
      'BRANCH_MANAGER',
      'COMPANY_MANAGER',
    ],
  },
  {
    link: '/branches',
    label: 'الفروع',
    enLabel: 'branches',
    icon: IconUsers,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER'],
  },
  {
    link: '/tenants',
    label: 'الشركات',
    enLabel: 'tenants',
    icon: IconBuildingCommunity,
    roles: ['ADMIN', 'ADMIN_ASSISTANT'],
  },
  {
    link: '/reports',
    label: 'الكشوفات',
    enLabel: 'reports',
    icon: IconFileTypePdf,
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'BRANCH_MANAGER',
      'ACCOUNTANT',
      'REPOSITORIY_EMPLOYEE',
      'CLIENT',
      'COMPANY_MANAGER',
    ],
  },
  {
    link: '/locations',
    label: 'المناطق',
    enLabel: 'regions',
    icon: IconMapPins,
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'BRANCH_MANAGER',
      'ACCOUNTANT',
      'DATA_ENTRY',
      'COMPANY_MANAGER',
    ],
  },
  {
    link: '/agents-manifest',
    label: 'منافيست المندوبين',
    enLabel: 'agents manifest',
    icon: IconTruckDelivery,
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'ACCOUNTANT',
      'BRANCH_MANAGER',
      'DATA_ENTRY',
      'COMPANY_MANAGER',
    ],
  },
  {
    link: '/employees',
    label: 'الموظفين',
    enLabel: 'employees',
    icon: IconUserCheck,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER'],
  },
  {
    link: '/forwarded',
    label: 'الطلبات المحالة للشركة',
    enLabel: 'forwarded orders',
    icon: IconSend,
    roles: ['COMPANY_MANAGER'],
  },
  {
    link: '/forwarded-to-company',
    label: 'الطلبات المحالة من للشركة',
    enLabel: 'forwarded orders to company',
    icon: IconPlayerTrackNext,
    roles: ['COMPANY_MANAGER'],
  },
  {
    link: '/client-orders-confirm',
    label: 'تأكيد طلبات العملاء',
    enLabel: 'client orders confirm',
    icon: IconCheck,
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'COMPANY_MANAGER',
      'REPOSITORIY_EMPLOYEE',
      'DATA_ENTRY',
    ],
  },
  {
    link: '/employees/add',
    label: 'اضافة مندوب',
    enLabel: 'employees',
    icon: IconUserCheck,
    roles: ['BRANCH_MANAGER'],
  },
  {
    link: '/treasury',
    label: 'الخزنة',
    enLabel: 'treasury',
    icon: IconCoin,
    roles: ['ACCOUNTANT', 'COMPANY_MANAGER'],
  },
  {
    link: '/repositories',
    label: 'المخازن',
    enLabel: 'repositories',
    icon: IconBuildingStore,
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'REPOSITORIY_EMPLOYEE',
      'ACCOUNTANT',
      'COMPANY_MANAGER',
    ],
  },
  {
    link: '/stores',
    label: 'المتاجر',
    enLabel: 'stores',
    icon: IconShoppingBag,
    roles: [
      'ADMIN',
      'ADMIN_ASSISTANT',
      'DATA_ENTRY',
      'ACCOUNTANT',
      'BRANCH_MANAGER',
      'CLIENT',
      'CLIENT_ASSISTANT',
      'COMPANY_MANAGER',
    ],
  },
  {
    link: '/repository-entries',
    label: 'ادخال رواجع المخزن',
    enLabel: 'repository entries',
    icon: IconArrowBackUp,
    roles: ['COMPANY_MANAGER', 'REPOSITORIY_EMPLOYEE', 'BRANCH_MANAGER'],
  },
  {
    link: '/banners',
    label: 'البنرات',
    enLabel: 'banners',
    icon: IconPhotoFilled,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER'],
  },
  {
    link: '/deleted',
    label: 'المحذوفات',
    enLabel: 'deleted',
    icon: IconTrashFilled,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER'],
  },
  {
    link: '/categories',
    label: 'الاصناف',
    enLabel: 'categories',
    icon: IconCategoryFilled,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER'],
  },
  {
    link: '/sizes',
    label: 'الاحجام',
    enLabel: 'sizes',
    icon: IconNeedle,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER'],
  },
  {
    link: '/colors',
    label: 'الالوان',
    enLabel: 'colors',
    icon: IconColorFilter,
    roles: ['ADMIN', 'ADMIN_ASSISTANT', 'COMPANY_MANAGER'],
  },
];
