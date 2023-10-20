import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

// const MAX_FILE_SIZE = 3 * 1024 * 1024;
// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ];

export const editClientSchema = z
  .object({
    name: z.string().min(3, { message: 'الاسم يجب ان يكون اكثر من 3 احرف' }),
    phone: z.string().refine(isValidIraqiPhoneNumber, {
      message: 'رقم الهاتف يجب ان يكون رقم عراقي',
    }),
    branch: z.string().min(1, { message: 'الرجاء اختيار الفرع' }),
    // image: z
    //   .any()
    //   .refine((files) => files?.length === 1, 'الصوره مطلوبة')
    //   .refine(
    //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //     'الحد الاقصي 5 ميجا'
    //   )
    //   .refine(
    //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //     'يجب ان تكون الصورة من نوع .jpg, .jpeg, .png او .webp'
    //   ),
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
