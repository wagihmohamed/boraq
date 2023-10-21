import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const addTenantSchema = z.object({
  name: z.string().min(3, { message: 'يجب ان يكون اكثر من 3 حروف' }),
  phone: z.string().refine(isValidIraqiPhoneNumber, {
    message: 'رقم الهاتف يجب ان يكون رقم عراقي',
  }),
  website: z.string().url({ message: 'يجب ان يكون رابط صحيح' }),
  logo: z.string(),
  registrationText: z
    .string()
    .min(3, { message: 'يجب ان يكون اكثر من 3 حروف' }),
  governoratePrice: z
    .string()
    .min(3, { message: 'يجب ان يكون اكثر من 3 حروف' }),
  deliveryAgentFee: z
    .string()
    .min(2, { message: 'يجب ان يكون اكثر من 2 حروف' }),
  baghdadPrice: z.string().min(2, { message: 'يجب ان يكون اكثر من 2 حروف' }),
  additionalPriceForEvery500000IraqiDinar: z
    .string()
    .min(2, { message: 'يجب ان يكون اكثر من 2 حروف' }),
  additionalPriceForEveryKilogram: z
    .string()
    .min(2, { message: 'يجب ان يكون اكثر من 2 حروف' }),
  additionalPriceForRemoteAreas: z
    .string()
    .min(2, { message: 'يجب ان يكون اكثر من 2 حروف' }),
  orderStatusAutomaticUpdate: z.boolean(),
});
