import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const editEmployeeSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'اسم المستخدم يجب ان يكون اكثر من 3 احرف' }),
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
    repository: z.string().min(1, { message: 'الرجاء اختيار المخزن' }),
    role: z
      .string({
        required_error: 'الرجاء اختيار الادوار',
      })

      .min(1, { message: 'الرجاء اختيار الادوار' }),
    permissions: z
      .array(
        z.string({
          required_error: 'الرجاء اختيار الصلاحيات',
        })
      )
      .min(1, { message: 'الرجاء اختيار الصلاحيات' }),
    password: z
      .string()
      .min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' })
      .optional(),
    confirmPassword: z
      .string()
      .min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'كلمة المرور غير متطابقة',
      path: ['confirmPassword'],
    }
  );

//   password: z
//   .union([
//     z.string().length(0),
//     z.string().min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' }),
//   ])
//   .optional(),
// confirmPassword: z
//   .union([
//     z.string().length(0),
//     z.string().min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' }),
//   ])
//   .optional(),
