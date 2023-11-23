import { z } from 'zod';

export const createReportSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('COMPANY'),
    companyID: z
      .number({
        required_error: 'مطلوب',
        invalid_type_error: 'مطلوب',
      })
      .min(1, { message: 'الرجاء اختيار شركة' }),
  }),
  z.object({
    type: z.literal('DELIVERY_AGENT'),
    deliveryAgentID: z
      .number({
        required_error: 'مطلوب',
        invalid_type_error: 'مطلوب',
      })
      .min(1, { message: 'الرجاء اختيار عامل التوصيل' }),
  }),
  z.object({
    type: z.literal('GOVERNORATE'),
    governorate: z
      .string({
        required_error: 'مطلوب',
        invalid_type_error: 'مطلوب',
      })
      .min(1, { message: 'الرجاء اختيار المحافظة' }),
  }),
  z.object({
    type: z.literal('BRANCH'),
    branchID: z
      .number({
        required_error: 'مطلوب',
        invalid_type_error: 'مطلوب',
      })
      .min(1, { message: 'الرجاء اختيار فرع' }),
  }),
  z.object({
    type: z.literal('CLIENT'),
    clientID: z
      .number({
        required_error: 'مطلوب',
        invalid_type_error: 'مطلوب',
      })
      .min(1, { message: 'الرجاء اختيار عميل' }),
    storeID: z
      .number({
        required_error: 'مطلوب',
        invalid_type_error: 'مطلوب',
      })
      .min(1, { message: 'الرجاء اختيار متجر' }),
  }),
  z.object({
    type: z.literal('REPOSITORY'),
    repositoryID: z
      .number({
        required_error: 'مطلوب',
        invalid_type_error: 'مطلوب',
      })
      .min(1, { message: 'الرجاء اختيار مخزن' }),
  }),
]);
