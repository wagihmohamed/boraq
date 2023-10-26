import { AppLayout } from '@/components/AppLayout';
import { useForm, zodResolver } from '@mantine/form';
import { addOrderSchema } from './schema';

export const AddOrder = () => {
  const form = useForm({
    validate: zodResolver(addOrderSchema),
    initialValues: {
      totalCost: '',
      paidAmount: '',
      totalCoastInUSD: '',
      paidAmountInUSD: '',
      discount: '',
      quantity: '',
      weight: '',
      recipientName: '',
      recipientPhone: '',
      recipientAddress: '',
      details: '',
      notes: '',
      status: '',
      deliveryType: '',
      clientID: '',
      deliveryAgentID: '',
      deliveryDate: '',
      governorate: '',
      locationID: '',
      storeID: '',
      products: [],
    },
  });
  return <AppLayout>AddOrder</AppLayout>;
};
