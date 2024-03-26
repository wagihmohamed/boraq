// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const addClientSchema = z
  .object({
    name: z.string().min(3, { message: 'الاسم يجب ان يكون اكثر من 3 احرف' }),
    phone: z.string().refine(isValidIraqiPhoneNumber, {
      message: 'رقم الهاتف يجب ان يكون رقم عراقي',
    }),
    username: z
      .string()
      .min(3, { message: 'يجب ان يكون اسم المستخدم اكثر من 3 حروف' }),
    branch: z.string().min(1, { message: 'الرجاء اختيار الفرع' }),
    avatar: z.any(),
    // .refine((files) => files?.length && files?.length === 1, 'الصوره مطلوبة')
    // .refine(
    //   (files) => files?.[0]?.size && files?.[0]?.size <= MAX_FILE_SIZE,
    //   'الحد الاقصي 5 ميجا'
    // ),
    // .refine(
    //   (files) =>
    //     files?.[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   'يجب ان تكون الصورة من نوع .jpg, .jpeg, .png او .webp'
    // ),
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
