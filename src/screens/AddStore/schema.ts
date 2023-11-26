// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, { message: 'يجب ان يكون اسم المنتج اكثر من 3 احرف' }),
  client: z.string().min(1, { message: 'يجب اختيار العميل' }),
  notes: z.string().min(3, { message: 'يجب ان يكون الوصف اكثر من 3 احرف' }),
  logo: z.any(),
  // .refine((files) => files?.length === 1, 'الصوره مطلوبة')
  // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'الحد الاقصي 5 ميجا')
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   'يجب ان تكون الصورة من نوع .jpg, .jpeg, .png او .webp'
  // ),
});
