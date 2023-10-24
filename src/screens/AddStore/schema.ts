import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, { message: 'يجب ان يكون اسم المنتج اكثر من 3 احرف' }),
  client: z.string().min(1, { message: 'يجب اختيار العميل' }),
  notes: z.string().min(3, { message: 'يجب ان يكون الوصف اكثر من 3 احرف' }),
});
