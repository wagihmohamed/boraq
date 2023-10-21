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
  data: EditTenantPayload;
  id: string;
}) => {
  const response = await api.patch<EditTenantPayload>(
    editTenantendpoint + id,
    data
  );
  return response.data;
};
