import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const addTenantSchema = z.object({
  name: z.string().min(3, { message: 'يجب ان يكون اكثر من 3 حروف' }),
  phone: z.string().refine(isValidIraqiPhoneNumber, {
    message: 'رقم الهاتف يجب ان يكون رقم عراقي',
  }),
  website: z.string().url({ message: 'يجب ان يكون رابط صحيح' }),
  registrationText: z
    .string()
    .min(3, { message: 'يجب ان يكون اكثر من 3 حروف' }),
  logo: z
    .any()
    .refine((files) => files?.length === 1, 'الصوره مطلوبة')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'الحد الاقصي 5 ميجا')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'يجب ان تكون الصورة من نوع .jpg, .jpeg, .png او .webp'
    ),
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
