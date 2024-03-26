import { useEditEmployee } from '@/hooks/useEditEmployee';
import { useStores } from '@/hooks/useStores';
import { getSelectOptions } from '@/lib/getSelectOptions';
import { Button, Modal, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

interface AssignClientAssistantToStoresProps {
  id: number;
  managedStores: { id: number; name: string }[];
}

export const AssignClientAssistantToStores = ({
  id,
  managedStores,
}: AssignClientAssistantToStoresProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: storesData } = useStores({
    size: 100000,
    minified: true,
  });
  const stringifiedManagedStores = managedStores.map((store) =>
    store.id.toString()
  );
  const [selectedStores, setSelectedStores] = useState<string[]>(
    stringifiedManagedStores
  );

  const { mutate: editClientAssistantStores, isLoading } = useEditEmployee();

  const handleSubmit = () => {
    const selectedStoresIDs = selectedStores?.map((store) => Number(store));
    editClientAssistantStores({
      id,
      data: {
        storesIDs: selectedStoresIDs || [],
      },
    });
  };

  return (
    <>
      <Modal
        title="اضافة متاجر لمساعد العميل"
        opened={opened}
        onClose={close}
        centered
      >
        <MultiSelect
          value={selectedStores}
          label="المتاجر"
          searchable
          clearable
          onChange={(e) => {
            setSelectedStores(e);
          }}
          placeholder="اختر المتجر"
          data={getSelectOptions(storesData?.data || [])}
          limit={100}
        />
        <div className="flex justify-between mt-4 gap-6">
          <Button
            loading={false}
            disabled={isLoading}
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

      <Button onClick={open}>تغير المتاجر</Button>
    </>
  );
};
