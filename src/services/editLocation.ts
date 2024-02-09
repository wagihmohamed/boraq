import { api } from '@/api';
import { editLocationendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface EditLocationPayload {
  name?: string;
  governorate?: keyof typeof governorateArabicNames;
  branchID?: number;
  deliveryAgentsIDs?: number[];
}

export const editLocationService = async ({
  data,
  id,
}: {
  data: EditLocationPayload;
  id: number;
}) => {
  const response = await api.patch<EditLocationPayload>(
    editLocationendpoint + id,
    data
  );
  return response.data;
};

export const editLocationDeliveryAgentsService = async ({
  branchID,
  deliveryAgentsIDs,
}: EditLocationPayload) => {
  const response = await api.patch<EditLocationPayload>(
    editLocationendpoint + branchID,
    { deliveryAgentsIDs }
  );
  return response.data;
};
