import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import * as z from 'zod';

export const addOrderSchema = z.object({
  withProducts: z.boolean().default(false),
  totalCost: z.string().min(1, { message: 'الرجاء ادخال السعر الكلي' }),
  quantity: z.string().min(1, { message: 'الرجاء ادخال الكمية' }),
  weight: z.string().min(1, { message: 'الرجاء ادخال الوزن' }),
  recipientName: z.string().min(1, { message: 'الرجاء ادخال اسم المستلم' }),
  recipientPhone: z.string().refine(isValidIraqiPhoneNumber, {
    message: 'رقم الهاتف يجب ان يكون رقم عراقي',
  }),
  recipientAddress: z
    .string()
    .min(1, { message: 'الرجاء ادخال عنوان المستلم' }),
  notes: z.string().optional(),
  details: z.string().optional(),
  deliveryType: z.string().min(1, { message: 'الرجاء اختيار نوع التوصيل' }),
  governorate: z.string().min(1, { message: 'الرجاء اختيار المحافظة' }),
  locationID: z.string().min(1, { message: 'الرجاء اختيار الموقع' }),
  storeID: z.string().min(1, { message: 'الرجاء اختيار المتجر' }),
});
