import { api } from '@/api';
import FileSaver from 'file-saver';

export const getOrderReceipt = async (orderId: string, name: string) => {
  const response = await api.get(`/orders/${orderId}/receipt`, {
    responseType: 'arraybuffer',
  });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  FileSaver.saveAs(blob, `وصل طلبية ${name}.pdf`);
};
