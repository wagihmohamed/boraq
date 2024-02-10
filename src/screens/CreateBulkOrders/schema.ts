import * as z from 'zod';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';

export interface CreateBulkOrdersSchema {
  id: string;
  withProducts: boolean;
  totalCost: string;
  quantity: string;
  weight: string;
  recipientName: string;
  recipientPhones: string[];
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
      recipientPhones: z
        .array(
          z.object({
            phone: z.string().refine(isValidIraqiPhoneNumber, {
              message: 'رقم الهاتف يجب ان يكون رقم عراقي',
            }),
            key: z.any(),
          }),
          {
            required_error: 'مطلوب',
          }
        )
        .min(1, { message: 'الرجاء ادخال رقم الهاتف' }),
      recipientAddress: z
        .string({
          required_error: 'مطلوب',
        })
        .optional(),
      notes: z
        .string({
          required_error: 'مطلوب',
        })
        .optional(),
      receiptNumber: z
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
        .optional(),
      governorate: z
        .string({
          required_error: 'مطلوب',
        })
        .optional(),
      locationID: z
        .string({
          required_error: 'مطلوب',
        })
        .min(1, { message: 'الرجاء اختيار الموقع' }),
      storeID: z
        .string({
          required_error: 'مطلوب',
        })
        .optional(),
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
