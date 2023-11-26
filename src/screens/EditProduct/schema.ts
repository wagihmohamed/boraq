// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { z } from 'zod';

export const editProductSchema = z
  .object({
    title: z.string().min(3, { message: 'اسم المنتج قصير جداً' }),
    price: z
      .string()
      .min(0, { message: 'السعر لا يمكن ان يكون اقل من 0' })
      .refine((value) => Number(value) > 0 || Number(value) === 0, {
        message: 'السعر لا يمكن ان يكون اقل من 0',
      }),
    image: z.any(),
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
    stock: z.string(),
    categoryID: z.string().min(1, { message: 'يجب اختيار القسم' }),
    colors: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          quantity: z.string(),
        })
      )
      .min(1, { message: 'يجب اختيار لون واحد على الاقل' }),
    sizes: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          quantity: z.string(),
        })
      )
      .min(1, { message: 'يجب اختيار مقاس واحد على الاقل' }),
  })
  .refine((data) => {
    if (data.colors.length < 1) {
      return false;
    }
    if (data.sizes.length < 1) {
      return false;
    }
    return true;
  });
