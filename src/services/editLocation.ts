import { api } from '@/api';
import { editEmployeeendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface EditLocationPayload {
  name: string;
  governorate: keyof typeof governorateArabicNames;
  branchID: number;
  deliveryAgentsIDs: number[];
}

export const editLocationService = async ({
  data,
  id,
}: {
  data: EditLocationPayload;
  id: number;
}) => {
  const response = await api.patch<EditLocationPayload>(
    editEmployeeendpoint + id,
    data
  );
  return response.data;
};
