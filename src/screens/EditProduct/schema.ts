import { z } from 'zod';

export const editProductSchema = z
  .object({
    title: z.string().min(3, { message: 'اسم المنتج قصير جداً' }),
    price: z.string().min(0, { message: 'السعر لا يمكن ان يكون اقل من 0' }),
    image: z.string().url(),
    stock: z.string(),
    category: z.string().min(3, { message: 'يجب اختيار القسم' }),
    colors: z
      .array(
        z.object({
          label: z.string(),
          value: z.string().optional(),
          quantity: z.string(),
        })
      )
      .min(1, { message: 'يجب اختيار لون واحد على الاقل' }),
    sizes: z
      .array(
        z.object({
          label: z.string(),
          value: z.string().optional(),
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
