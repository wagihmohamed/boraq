// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/consts';
import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const editTenantSchema = z.object({
  name: z.string().min(3, { message: 'يجب ان يكون اكثر من 3 حروف' }),
  phone: z.string().refine(isValidIraqiPhoneNumber, {
    message: 'رقم الهاتف يجب ان يكون رقم عراقي',
  }),
  website: z.string().url({ message: 'يجب ان يكون رابط صحيح' }),
  logo: z.any(),
  // .refine((files) => {
  //   if (files && Array.isArray(files) && files.length > 0) {
  //     const file = files[0];
  //     return !file.type || ACCEPTED_IMAGE_TYPES.includes(file.type);
  //   }
  //   return true;
  // }, 'يجب أن تكون الصورة من نوع .jpg, .jpeg, .png أو .webp')
  // .refine((files) => {
  //   if (files && Array.isArray(files) && files.length > 0) {
  //     const file = files[0];
  //     return !file.size || file.size <= MAX_FILE_SIZE;
  //   }
  //   return true;
  // }, 'الحد الأقصى 5 ميجا'),
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
