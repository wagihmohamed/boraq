import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const editTenantSchema = z.object({
  name: z.string().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  phone: z.string().refine(isValidIraqiPhoneNumber, {
    message: 'رقم الهاتف يجب ان يكون رقم عراقي',
  }),
  website: z.string().url({ message: 'يجب ان يكون رابط صحيح' }),
  logo: z.any(),
  registrationText: z.string().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  governoratePrice: z.number().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  deliveryAgentFee: z.number().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  baghdadPrice: z.number().min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  additionalPriceForEvery500000IraqiDinar: z
    .number()
    .min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  additionalPriceForEveryKilogram: z
    .number()
    .min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  additionalPriceForRemoteAreas: z
    .number()
    .min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  orderStatusAutomaticUpdate: z.boolean(),
});
