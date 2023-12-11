import { api } from '@/api';
import FileSaver from 'file-saver';

export const getOrderReceipt = async (ordersIDs: number[], name: string) => {
  const response = await api.post('/orders/receipts', { ordersIDs });

  if (response.headers['content-type'] === 'application/json') {
    const blob = new Blob([response.data], { type: 'application/pdf' });
    FileSaver.saveAs(blob, `وصل طلبية ${name}.pdf`);
    response.config.responseType = 'blob';
    return response.data;
  }
  return response.data;
};
