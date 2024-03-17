import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const editEmployeeSchema = z
  .object({
    name: z.string().min(3, { message: 'الاسم يجب ان يكون اكثر من 3 احرف' }),
    phone: z.string().refine(isValidIraqiPhoneNumber, {
      message: 'رقم الهاتف يجب ان يكون رقم عراقي',
    }),
    companyID: z.string().min(1, { message: 'الرجاء اختيار الشركة' }),
    avatar: z.any(),
    deliveryCost: z.number(),
    salary: z
      .number({
        required_error: 'الرجاء ادخال الأجرة',
      })
      .refine((value) => value > 0, {
        message: 'الرجاء ادخال الأجرة',
      }),
    branch: z.string().min(1, { message: 'الرجاء اختيار الفرع' }),
    repository: z.string().min(1, { message: 'الرجاء اختيار المخزن' }),
    role: z
      .string({
        required_error: 'الرجاء اختيار الادوار',
      })

      .min(1, { message: 'الرجاء اختيار الادوار' }),
    permissions: z.array(
      z.string({
        required_error: 'الرجاء اختيار الصلاحيات',
      })
    ),
    password: z
      .string()
      .refine((password) => !password || password.length >= 6, {
        message: 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل',
      })
      .optional(),
    confirmPassword: z
      .string()
      .refine(
        (confirmPassword) => !confirmPassword || confirmPassword.length >= 6,
        {
          message: 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل',
        }
      )
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
  )
  .refine(
    (data) => {
      if (data.password && !data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'كلمة المرور غير متطابقة',
      path: ['confirmPassword'],
    }
  );
