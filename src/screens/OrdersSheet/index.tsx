import { AppLayout } from '@/components/AppLayout';
import { useState } from 'react';
import { SheetUploader } from './components/SheetUploader';

export const OrdersSheet = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <AppLayout>
      <SheetUploader files={files} onDrop={setFiles} />
    </AppLayout>
  );
};
