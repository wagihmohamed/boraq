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

export const createBulkOfOrdersSchema = z.object({
  orders: z.array(
    z
      .object({
        recipientName: z.string(),
        recipientPhones: z.array(
          z.object(
            {
              phone: z.string().refine(isValidIraqiPhoneNumber, {
                message: 'رقم الهاتف يجب ان يكون رقم عراقي',
              }),
              key: z.any(),
            },
            {
              required_error: 'مطلوب',
            }
          )
        ),
        notes: z.string().optional(),
        governorate: z.string().optional(),
        details: z.string({
          required_error: 'مطلوب',
        }),
        locationID: z.string().min(1, { message: 'الرجاء اختيار الموقع' }),
        storeID: z.string(),
      })
      .and(
        z.discriminatedUnion('withProducts', [
          z.object({
            withProducts: z.literal(true),
            products: z
              .array(
                z.object({
                  productID: z
                    .string()
                    .min(1, { message: 'الرجاء اختيار المنتج' }),
                  quantity: z
                    .string()
                    .min(1, { message: 'الرجاء ادخال الكمية' }),
                  colorID: z
                    .string()
                    .min(1, { message: 'الرجاء اختيار اللون' }),
                  sizeID: z
                    .string()
                    .min(1, { message: 'الرجاء اختيار المقاس' }),
                })
              )
              .min(1, { message: 'الرجاء اختيار المنتجات' })
              .optional(),
          }),
          z.object({
            withProducts: z.literal(false),
            totalCost: z
              .number()
              .min(1, { message: 'الرجاء ادخال السعر' })
              .optional(),
            quantity: z
              .string()
              .min(1, { message: 'الرجاء ادخال الكمية' })
              .optional(),
            weight: z
              .number()
              .min(1, { message: 'الرجاء ادخال الوزن' })
              .optional(),
          }),
        ])
      )
  ),
});
