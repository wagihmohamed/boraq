import { z } from 'zod';

// {
//     "title": "zobry",
//     "price": 12,
//     "image": "https://loremflickr.com/640/480?lock=2507770588823552",
//     "stock": 32,
//     "category": "test",
//     "colors": [
//         {
//             "title": "red",
//             "quantity": 22
//         }
//     ],
//     "sizes": [
//         {
//             "title": "dasd",
//             "quantity": 12
//         }
//     ]
// }

export const addProductSchema = z.object({
  title: z.string().min(3, { message: 'اسم المنتج قصير جداً' }),
  price: z.string().min(0, { message: 'السعر لا يمكن ان يكون اقل من 0' }),
  //   image: z.string().url(),
  stock: z.string(),
  category: z.string().min(3, { message: 'يجب اختيار القسم' }),
  colors: z.array(
    z.object({
      title: z.string(),
      quantity: z.string(),
    })
  ),
  sizes: z.array(
    z.object({
      title: z.string().min(3),
      quantity: z.string(),
    })
  ),
});
