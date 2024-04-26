import { useEditOrder } from '@/hooks/useEditOrder';
import { Order } from '@/services/getOrders';
import { ActionIcon, Button, Popover, TextInput } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

interface EditableTableCellProps<T> {
  id: number;
  value: T;
  type: keyof Order;
  typeOfValue: 'number' | 'string';
}

export const EditableTableCell = <T extends number | string>({
  value,
  id,
  type,
  typeOfValue,
}: EditableTableCellProps<T>) => {
  const [opened, setOpened] = useState(false);
  const [requiredChangeValue, setRequiredChangeValue] = useState(value);

  const { mutate: editOrder, isLoading } = useEditOrder();

  const handleEditOrder = () => {
    editOrder(
      {
        id,
        data: {
          [type]:
            typeOfValue === 'number'
              ? +requiredChangeValue
              : requiredChangeValue,
        },
      },
      {
        onSuccess: () => {
          setOpened(false);
        },
      }
    );
  };

  return (
    <Popover
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
      onClose={() => setRequiredChangeValue(value)}
    >
      <Popover.Target>
        <Button
          variant="transparent"
          color="indigo"
          onClick={() => setOpened((o) => !o)}
          classNames={{ label: 'underline' }}
          size="compact-sm"
        >
          {value}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex gap-2 items-center">
          <TextInput
            value={requiredChangeValue || ''}
            onChange={(event) =>
              setRequiredChangeValue(event.target.value as T)
            }
            size="xs"
          />
          <ActionIcon
            disabled={isLoading}
            onClick={handleEditOrder}
            color="teal"
          >
            <IconCheck />
          </ActionIcon>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
