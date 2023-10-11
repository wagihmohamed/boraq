import { AppLayout } from '@/components/AppLayout';
import {
  Autocomplete,
  Button,
  MultiSelect,
  PasswordInput,
  TextInput,
} from '@mantine/core';

export const AddEmployee = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl font-semibold">اضافة موظف</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <TextInput label="الاسم" placeholder="" size="md" className="w-full" />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
        />
        <TextInput
          label="الأجرة"
          type="number"
          placeholder=""
          size="md"
          className="w-full"
        />
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={['بغداد', 'البصرة', 'النجف']}
        />
        <Autocomplete
          label="المخزن"
          placeholder="اختار المخزن"
          data={['مخزن البصرة', 'مخزن النجف', 'مخزن بغداد', 'مخزن الكرخ']}
        />
        <Autocomplete
          label="الوظيفة"
          placeholder="اختار الوظيفة"
          data={[
            'مدير الشركة',
            'مدير فرع',
            'مدير حسابات',
            'محاسب',
            'موظف طوارئ',
            'مدخل بيانات',
            'موظف مخازن',
            'موظف استعلامات',
            'مندوب استلام',
          ]}
        />
        <MultiSelect
          label="الادوار"
          placeholder="اختار الادوار"
          data={[
            'مدير الشركة',
            'مدير فرع',
            'مدير حسابات',
            'محاسب',
            'موظف طوارئ',
            'مدخل بيانات',
            'موظف مخازن',
            'موظف استعلامات',
            'مندوب استلام',
          ]}
        />
        <MultiSelect
          label="الصلاحيات"
          placeholder="اختار الصلاحيات"
          data={[
            'احالة الطلبات الي مندوب',
            'اضافة صفحة',
            'اضافة طلبات',
            'اضافة عميل',
            'تعديل اسم عميل',
            'تعديل المبلغ الكلي للطلبية',
            'تغير الحالة',
            'تغير حالة الطلبية المغلقة',
            'قفل حالة الطلبية',
            'مسح الاشعارات',
            'مسح الطلبيات',
            'مسح الكشوفات',
            'مسح كشوفات الشركات',
            'مسح كشوفات المخازن',
            'مسح كشوفات العملاء',
            'مسح كشوفات محافظة',
            'مسح كشوفات مندوبين',
          ]}
        />
        <PasswordInput
          label="كلمة المرور"
          placeholder="*******"
          mt="md"
          size="md"
          className="w-full"
        />
        <PasswordInput
          label="تأكيد كلمة المرور"
          placeholder="*******"
          mt="md"
          size="md"
          className="w-full"
        />
        <Button type="submit" fullWidth mt="xl" size="md">
          اضافة
        </Button>
        <Button type="reset" fullWidth mt="xl" size="md" variant="outline">
          الغاء
        </Button>
      </div>
    </AppLayout>
  );
};
