import * as z from 'zod';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';

export interface CreateBulkOrdersSchema {
  id: string;
  withProducts: boolean;
  totalCost: string;
  quantity: string;
  weight: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  notes: string;
  details: string;
  deliveryType: string;
  governorate: string;
  locationID: string;
  storeID: string;
}

export const orderBulkSchema = z.object({
  orders: z.array(
    z.object({
      withProducts: z.boolean().default(false),
      recipientName: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء ادخال اسم المستلم' }),
      recipientPhone: z
        .string({
          required_error: 'مطلوب',
        })
        .refine(isValidIraqiPhoneNumber, {
          message: 'رقم الهاتف يجب ان يكون رقم عراقي',
        }),
      recipientAddress: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء ادخال عنوان المستلم' }),
      notes: z
        .string({
          required_error: 'مطلوب',
        })
        .optional(),
      details: z
        .string({
          required_error: 'مطلوب',
        })
        .optional(),
      deliveryType: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء اختيار نوع التوصيل' }),
      governorate: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء اختيار المحافظة' }),
      locationID: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء اختيار الموقع' }),
      storeID: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء اختيار المتجر' }),
      totalCost: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء ادخال السعر' })
        .optional(),
      quantity: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء ادخال الكمية' })
        .optional(),
      weight: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء ادخال الوزن' })
        .optional(),
    })
  ),
});
