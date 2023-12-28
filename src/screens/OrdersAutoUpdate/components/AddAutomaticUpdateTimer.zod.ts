import { z } from 'zod';

export const orderStatusAutomaticUpdateCreateSchema = z.object({
  orderStatus: z
    .string({
      required_error: 'يجب ادخال حالة الطلب',
    })
    .nonempty({
      message: 'يجب ادخال حالة الطلب',
    }),
  governorate: z
    .string({
      required_error: 'يجب ادخال المحافظة',
    })
    .nonempty({
      message: 'يجب ادخال المحافظة',
    }),
  returnCondition: z
    .string({
      required_error: 'يجب ادخال حالة الارجاع',
    })
    .nonempty({
      message: 'يجب ادخال حالة الارجاع',
    }),
  updateAt: z
    .number({
      required_error: 'يجب ادخال وقت التحديث',
      invalid_type_error: 'يجب ادخال وقت التحديث',
    })
    .min(0, { message: 'يجب ادخال وقت التحديث' })
    .max(24, { message: 'لا يمكن ان يكون وقت التحديث اكثر من 24 ساعة' }),
  checkAfter: z
    .number({
      required_error: 'يجب ادخال وقت التحديث',
      invalid_type_error: 'يجب ادخال وقت التحديث',
    })
    .min(0, { message: 'يجب ادخال وقت التحديث' }),
});
