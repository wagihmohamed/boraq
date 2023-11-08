import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
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
    avatar: z
      .any()
      .refine((files) => {
        if (files && Array.isArray(files) && files.length > 0) {
          const file = files[0];
          return !file.type || ACCEPTED_IMAGE_TYPES.includes(file.type);
        }
        return true;
      }, 'يجب أن تكون الصورة من نوع .jpg, .jpeg, .png أو .webp')
      .refine((files) => {
        if (files && Array.isArray(files) && files.length > 0) {
          const file = files[0];
          return !file.size || file.size <= MAX_FILE_SIZE;
        }
        return true;
      }, 'الحد الأقصى 5 ميجا'),
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
