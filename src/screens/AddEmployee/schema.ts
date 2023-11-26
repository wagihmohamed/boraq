// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const addEmployeeSchema = z
  .object({
    username: z.string().min(3, { message: 'اسم المستخدم يجب ان يكون 3 احرف' }),
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
    avatar: z.any(),
    // .refine((files) => files?.length === 1, 'الصوره مطلوبة')
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   'الحد الاقصي 5 ميجا'
    // )
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   'يجب ان تكون الصورة من نوع .jpg, .jpeg, .png او .webp'
    // ),
    branch: z.string().min(1, { message: 'الرجاء اختيار الفرع' }),
    store: z.string().min(1, { message: 'الرجاء اختيار المخزن' }),
    roles: z
      .string({
        required_error: 'الرجاء اختيار الادوار',
      })

      .min(1, { message: 'الرجاء اختيار الادوار' }),
    permissions: z
      .array(z.string({ required_error: 'الرجاء اختيار الصلاحيات' }))
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
