import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select } from '@mantine/core';
import { useState } from 'react';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { useEmployees } from '@/hooks/useEmployees';
import { useLocationsStore } from '@/store/locationsStore';
import {
  EditLocationPayload,
  editLocationDeliveryAgentsService,
} from '@/services/editLocation';

export const ChangeLocationDeliveryAgent = () => {
  const queryClient = useQueryClient();
  const { locations: selectedLocations } = useLocationsStore();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: deliveryAgents } = useEmployees({
    size: 100000,
    minified: true,
    roles: ['DELIVERY_AGENT'],
  });
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  const { mutate: editLocationAction, isLoading: isEditing } = useMutation({
    mutationFn: (data: EditLocationPayload) => {
      return editLocationDeliveryAgentsService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['locations'],
      });
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleSubmit = () => {
    if (selectedDelivery) {
      selectedLocations.forEach((location) => {
        editLocationAction({
          branchID: Number(location.id),
          deliveryAgentsIDs: [Number(selectedDelivery)],
        });
      });
      toast.success('تم تعديل المندوب بنجاح');
    }
  };

  return (
    <>
      <Modal title="تغيير  المندوب" opened={opened} onClose={close} centered>
        <Select
          value={selectedDelivery}
          allowDeselect
          label="المندوب"
          searchable
          clearable
          onChange={(e) => {
            setSelectedDelivery(e);
          }}
          placeholder="اختر المندوب"
          data={getSelectOptions(deliveryAgents?.data || [])}
          limit={100}
        />
        <div className="flex justify-between mt-4 gap-6">
          <Button
            loading={false}
            disabled={!selectedDelivery || isEditing}
            fullWidth
            onClick={handleSubmit}
            type="submit"
          >
            تعديل
          </Button>

          <Button
            onClick={() => {
              close();
            }}
            fullWidth
            variant="outline"
          >
            الغاء
          </Button>
        </div>
      </Modal>

      <Button
        disabled={!selectedLocations.length}
        loading={isEditing}
        onClick={open}
      >
        احالة المناطق الي مندوب
      </Button>
    </>
  );
};
