import { AppLayout } from '@/components/AppLayout';
import { Autocomplete, Button, MultiSelect, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { editEmployeeSchema } from './schema';

export const EditEmployee = () => {
  const navigate = useNavigate();

  const form = useForm({
    validate: zodResolver(editEmployeeSchema),
    initialValues: {
      name: 'وجيه محمد',
      phone: '07912345678',
      salary: '1000',
      branch: 'بغداد',
      store: 'مخزن البصرة',
      job: 'مدير الشركة',
      roles: ['مدير الشركة', 'مدير فرع', 'مدير حسابات'],
      permissions: ['اضافة صفحة', 'اضافة طلبات', 'اضافة عميل'],
    },
  });

  const handleSubmit = () => {};

  return (
    <AppLayout>
      <div className="flex items-center gap-4">
        <ChevronRight
          size={34}
          className="mt-3 cursor-pointer"
          onClick={() => {
            navigate('/employees');
          }}
        />
        <h1 className="text-3xl font-semibold">تعديل موظف</h1>
      </div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
      >
        <TextInput
          label="الاسم"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="رقم الهاتف"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('phone')}
        />
        <TextInput
          label="الأجرة"
          type="number"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('salary')}
        />
        <Autocomplete
          label="الفرع"
          placeholder="اختار الفرع"
          data={['بغداد', 'البصرة', 'النجف']}
          {...form.getInputProps('branch')}
        />
        <Autocomplete
          label="المخزن"
          placeholder="اختار المخزن"
          data={['مخزن البصرة', 'مخزن النجف', 'مخزن بغداد', 'مخزن الكرخ']}
          {...form.getInputProps('store')}
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
          {...form.getInputProps('job')}
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
          {...form.getInputProps('roles')}
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
          {...form.getInputProps('permissions')}
        />
        <Button type="submit" fullWidth mt="xl" size="md">
          تعديل
        </Button>
        <Button type="reset" fullWidth mt="xl" size="md" variant="outline">
          الغاء
        </Button>
      </form>
    </AppLayout>
  );
};
