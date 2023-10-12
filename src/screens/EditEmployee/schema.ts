import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const editEmployeeSchema = z.object({
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
});
