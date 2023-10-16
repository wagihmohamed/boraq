import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from 'zod';

export const editBranchSchema = z.object({
  name: z.string().min(3, { message: 'يجب ان يكون اكثر من 3 حروف' }),
  email: z.string().email({ message: 'يجب ان يكون بريد الكتروني' }),
  phone: z.string().refine(isValidIraqiPhoneNumber, {
    message: 'رقم الهاتف يجب ان يكون رقم عراقي',
  }),
  location: z.string().min(1, { message: 'الرجاء اختيار الموقع' }),
});
