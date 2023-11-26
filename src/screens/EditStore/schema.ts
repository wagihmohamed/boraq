// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { z } from 'zod';

export const editProductSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'يجب ان يكون اسم المنتج نص',
      required_error: 'يجب ادخال اسم المنتج',
    })
    .min(3, { message: 'يجب ان يكون اسم المنتج اكثر من 3 احرف' }),
  client: z
    .string({
      invalid_type_error: 'يجب ان يكون العميل نص',
      required_error: 'يجب اختيار العميل',
    })
    .min(1, { message: 'يجب اختيار العميل' }),
  notes: z.string().min(3, { message: 'يجب ان يكون الوصف اكثر من 3 احرف' }),
  logo: z.any(),
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
});
