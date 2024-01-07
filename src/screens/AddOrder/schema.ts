import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import * as z from 'zod';

const bseSchema = z.object({
  recipientName: z.string().min(1, { message: 'الرجاء ادخال اسم المستلم' }),
  recipientPhone: z.array(
    z.object({
      number: z.string().refine(isValidIraqiPhoneNumber, {
        message: 'رقم الهاتف يجب ان يكون رقم عراقي',
      }),
      key: z.any(),
    })
  ),
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

export const addOrderSchema = z
  .discriminatedUnion('withProducts', [
    z.object({
      withProducts: z.literal(true),
      products: z
        .array(
          z.object({
            productID: z.string().min(1, { message: 'الرجاء اختيار المنتج' }),
            quantity: z.string().min(1, { message: 'الرجاء ادخال الكمية' }),
            colorID: z.string().min(1, { message: 'الرجاء اختيار اللون' }),
            sizeID: z.string().min(1, { message: 'الرجاء اختيار المقاس' }),
          })
        )
        .min(1, { message: 'الرجاء اختيار المنتجات' })
        .optional(),
    }),
    z.object({
      withProducts: z.literal(false),
      totalCost: z
        .string()
        .min(1, { message: 'الرجاء ادخال السعر' })
        .optional(),
      quantity: z
        .string()
        .min(1, { message: 'الرجاء ادخال الكمية' })
        .optional(),
      weight: z.string().min(1, { message: 'الرجاء ادخال الوزن' }).optional(),
    }),
  ])
  .and(bseSchema);
