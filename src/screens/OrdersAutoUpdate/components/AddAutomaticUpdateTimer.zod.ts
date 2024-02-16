import { z } from 'zod';

export const orderStatusAutomaticUpdateCreateSchema = z.object({
  orderStatus: z
    .string({
      required_error: 'يجب ادخال حالة الطلب',
    })
    .nonempty({
      message: 'يجب ادخال حالة الطلب',
    }),
  newOrderStatus: z
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
  branchID: z.string({
    required_error: 'يجب ادخال الفرع',
  }),
  checkAfter: z
    .number({
      required_error: 'يجب ادخال وقت التحديث',
      invalid_type_error: 'يجب ادخال وقت التحديث',
    })
    .min(0, { message: 'يجب ادخال وقت التحديث' }),
});
