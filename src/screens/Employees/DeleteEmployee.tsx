import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export const DeleteEmployee = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الموظف" centered>
        هل انت متأكد من مسح الموظف؟ لا يمكن التراجع عن هذا الإجراء
        <div className="mt-4 flex items-center gap-4">
          <Button variant="filled" onClick={close}>
            مسح
          </Button>
          <Button variant="outline" onClick={close} className="mr-4">
            إلغاء
          </Button>
        </div>
      </Modal>

      <Button fullWidth variant="filled" onClick={open}>
        مسح
      </Button>
    </>
  );
};
