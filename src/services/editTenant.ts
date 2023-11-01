import { api } from '@/api';
import { editTenantendpoint } from '@/api/apisUrl';

export interface EditTenantPayload {
  name: string;
  phone: string;
  website: string;
  logo: string;
  registrationText: string;
  governoratePrice: number;
  deliveryAgentFee: number;
  baghdadPrice: number;
  additionalPriceForEvery500000IraqiDinar: number;
  additionalPriceForEveryKilogram: number;
  additionalPriceForRemoteAreas: number;
  orderStatusAutomaticUpdate: boolean;
}

export const editTenantService = async ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}) => {
  const response = await api.patch<FormData>(editTenantendpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
