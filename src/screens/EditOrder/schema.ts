import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import * as z from 'zod';

export const editOrderSchema = z.object({
  paidAmount: z.string().min(1, { message: 'الرجاء ادخال المبلغ المدفوع' }),
  discount: z.string().min(1, { message: 'الرجاء ادخال الخصم' }),
  status: z.string().min(1, { message: 'الرجاء اختيار حالة الطلب' }),
  deliveryAgentID: z
    .string()
    .min(1, { message: 'الرجاء اختيار مندوب التوصيل' })
    .optional(),
  deliveryDate: z.string().optional(),
  recipientName: z.string().min(1, { message: 'الرجاء ادخال اسم المستلم' }),
  recipientPhones: z.array(
    z.object(
      {
        number: z.string().refine(isValidIraqiPhoneNumber, {
          message: 'رقم الهاتف يجب ان يكون رقم عراقي',
        }),
        key: z.any(),
      },
      {
        required_error: 'مطلوب',
      }
    )
  ),
  recipientAddress: z
    .string()
    .min(1, { message: 'الرجاء ادخال عنوان المستلم' }),
  notes: z.string().optional(),
  details: z.string().optional(),
  repositoryID: z.string().optional(),
  branchID: z.string().optional(),
});
