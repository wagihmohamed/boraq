import { AppLayout } from '@/components/AppLayout';
import {
  Autocomplete,
  Button,
  MultiSelect,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { z } from 'zod';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { useForm, zodResolver } from '@mantine/form';

const schema = z
  .object({
    name: z.string().min(3, { message: 'الاسم يجب ان يكون اكثر من 3 احرف' }),
    phone: z.string().refine(isValidIraqiPhoneNumber, {
      message: 'رقم الهاتف يجب ان يكون رقم عراقي',
    }),
    salary: z
      .string({
        required_error: 'الرجاء ادخال الأجرة',
      })
      .refine((value) => parseInt(value, 10) > 0, {
        message: 'الرجاء ادخال الأجرة',
      }),
    branch: z.string().min(1, { message: 'الرجاء اختيار الفرع' }),
    store: z.string().min(1, { message: 'الرجاء اختيار المخزن' }),
    job: z
      .string({
        required_error: 'الرجاء اختيار الوظيفة',
      })
      .min(1, { message: 'الرجاء اختيار الوظيفة' }),
    roles: z
      .array(
        z.string({
          required_error: 'الرجاء اختيار الادوار',
        })
      )
      .min(1, { message: 'الرجاء اختيار الادوار' }),
    permissions: z
      .array(
        z.object({
          label: z.string({
            required_error: 'الرجاء اختيار الصلاحيات',
          }),
          value: z.string({
            required_error: 'الرجاء اختيار الصلاحيات',
          }),
        })
      )
      .min(1, { message: 'الرجاء اختيار الصلاحيات' }),
    password: z.string().min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمة المرور غير متطابقة',
    path: ['confirmPassword'],
  });

export const AddEmployee = () => {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      phone: '',
      salary: '',
      branch: '',
      store: '',
      job: '',
      roles: [],
      permissions: [],
      password: '',
      confirmPassword: '',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // values: z.infer<typeof schema>
  const handleSubmit = () => {};

  return (
    <AppLayout>
      <h1 className="text-3xl font-semibold">اضافة موظف</h1>
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
        <PasswordInput
          label="كلمة المرور"
          placeholder="*******"
          mt="md"
          size="md"
          className="w-full"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="تأكيد كلمة المرور"
          placeholder="*******"
          mt="md"
          size="md"
          className="w-full"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" fullWidth mt="xl" size="md">
          اضافة
        </Button>
        <Button type="reset" fullWidth mt="xl" size="md" variant="outline">
          الغاء
        </Button>
      </form>
    </AppLayout>
  );
};
