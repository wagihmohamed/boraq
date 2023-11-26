// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const editClientSchema = z
  .object({
    name: z.string().min(3, { message: 'الاسم يجب ان يكون اكثر من 3 احرف' }),
    phone: z.string().refine(isValidIraqiPhoneNumber, {
      message: 'رقم الهاتف يجب ان يكون رقم عراقي',
    }),
    branch: z.string().min(1, { message: 'الرجاء اختيار الفرع' }),
    avatar: z.any(),
    // .refine((files) => {
    //   if (files && Array.isArray(files) && files.length > 0) {
    //     const file = files[0];
    //     return !file.type || ACCEPTED_IMAGE_TYPES.includes(file.type);
    //   }
    //   return true;
    // }, 'يجب أن تكون الصورة من نوع .jpg, .jpeg, .png أو .webp')
    // .refine((files) => {
    //   if (files && Array.isArray(files) && files.length > 0) {
    //     const file = files[0];
    //     return !file.size || file.size <= MAX_FILE_SIZE;
    //   }
    //   return true;
    // }, 'الحد الأقصى 5 ميجا'),
    type: z.string().min(1, { message: 'الرجاء اختيار نوع الحساب' }),
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
