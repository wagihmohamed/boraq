import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
// import toast from 'react-hot-toast';
// import { AxiosError } from 'axios';
// import { APIError } from '@/models';
// import { deleteLocationService } from '@/services/deleteLocation';

export const AddSize = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [sizeName, setSizeName] = useState('');
  const queryClient = useQueryClient();
  //   const { mutate: deleteLocation, isLoading } = useMutation({
  //     mutationFn: (id: string) => deleteLocationService({ id }),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ['locations'],
  //       });
  //       toast.success('تم مسح المنطقة بنجاح');
  //       close();
  //     },
  //     onError: (error: AxiosError<APIError>) => {
  //       toast.error(error.response?.data.message || 'حدث خطأ ما');
  //     },
  //   });

  //   const handleDelete = () => {
  //     deleteLocation(id);
  //   };

  return (
    <>
      <Modal opened={opened} onClose={close} title="اضافة حجم" centered>
        <TextInput
          label="اسم الحجم"
          placeholder="اسم الحجم"
          required
          variant="filled"
          className="mb-4"
          value={sizeName}
          onChange={(e) => setSizeName(e.currentTarget.value)}
        />
        <div className="mt-4 flex items-center gap-4">
          <Button
            // loading={isLoading}
            disabled={!sizeName}
            variant="filled"
            // onClick={handleDelete}
          >
            مسح
          </Button>
          <Button variant="outline" onClick={close} className="mr-4">
            إلغاء
          </Button>
        </div>
      </Modal>

      <Button
        rightSection={<IconPlus size={18} />}
        onClick={open}
        className="mb-4 md:mb-8"
      >
        اضافة حجم جديد
      </Button>
    </>
  );
};

// import { useDisclosure } from '@mantine/hooks';
// import { Modal, Button } from '@mantine/core';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { AxiosError } from 'axios';
// import { APIError } from '@/models';
// import { deleteLocationService } from '@/services/deleteLocation';
// import { IconPlus } from '@tabler/icons-react';

// export const AddSize = () => {
//   const [opened, { open, close }] = useDisclosure(false);
//   const queryClient = useQueryClient();
//   //   const { mutate: deleteLocation, isLoading } = useMutation({
//   //     mutationFn: (id: string) => deleteLocationService({ id }),
//   //     onSuccess: () => {
//   //       queryClient.invalidateQueries({
//   //         queryKey: ['locations'],
//   //       });
//   //       toast.success('تم مسح المنطقة بنجاح');
//   //       close();
//   //     },
//   //     onError: (error: AxiosError<APIError>) => {
//   //       toast.error(error.response?.data.message || 'حدث خطأ ما');
//   //     },
//   //   });

//   //   const handleDelete = () => {
//   //     deleteLocation(id);
//   //   };

//   return (
//     <>
//       <Modal opened={opened} onClose={close} title="ddddd" centered>
//         هل انت متأكد من مسح المنطقة؟ لا يمكن التراجع عن هذا الإجراء
//         <div className="mt-4 flex items-center gap-4">
//           <Button
//             // loading={isLoading}
//             // disabled={isLoading}
//             variant="filled"
//             // onClick={handleDelete}
//           >
//             اضافة
//           </Button>
//           <Button variant="outline" onClick={close} className="mr-4">
//             إلغاء
//           </Button>
//         </div>
//       </Modal>

//       <Button rightSection={<IconPlus size={18} />} className="mb-4 md:mb-8">
//         اضافة حجم جديد
//       </Button>
//     </>
//   );
// };
