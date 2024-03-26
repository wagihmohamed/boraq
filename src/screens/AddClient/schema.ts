import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const addClientSchema = z
  .object({
    name: z.string().min(3, { message: 'الاسم يجب ان يكون اكثر من 3 احرف' }),
    phone: z.string().refine(isValidIraqiPhoneNumber, {
      message: 'رقم الهاتف يجب ان يكون رقم عراقي',
    }),
    branch: z.string(),
    avatar: z.any(),
    type: z.string().min(1, { message: 'الرجاء اختيار نوع الحساب' }),
    companyID: z.string().min(1, { message: 'الرجاء اختيار الشركة' }),
    password: z.string().min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'كلمة المرور يجب ان تكون 6 احرف' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمة المرور غير متطابقة',
    path: ['confirmPassword'],
  });
