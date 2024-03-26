// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const addTenantSchema = z.object({
  name: z.string().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  phone: z.string().refine(isValidIraqiPhoneNumber, {
    message: 'رقم الهاتف يجب ان يكون رقم عراقي',
  }),
  website: z.string().url({ message: 'يجب ان يكون رابط صحيح' }),
  registrationText: z.string().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  logo: z.any(),
  // .refine((files) => files?.length === 1, 'الصوره مطلوبة')
  // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'الحد الاقصي 5 ميجا')
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   'يجب ان تكون الصورة من نوع .jpg, .jpeg, .png او .webp'
  // ),
  governoratePrice: z.string().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  deliveryAgentFee: z.string().min(1, { message: 'يجب ان يكون اكتر من حرف' }),
  baghdadPrice: z.string().min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  additionalPriceForEvery500000IraqiDinar: z
    .string()
    .min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  additionalPriceForEveryKilogram: z
    .string()
    .min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  additionalPriceForRemoteAreas: z
    .string()
    .min(1, { message: 'يجب ان يكون اكثر من 1 حرف' }),
  orderStatusAutomaticUpdate: z.boolean(),
});
