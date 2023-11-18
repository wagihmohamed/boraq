import { api } from '@/api';
import FileSaver from 'file-saver';

export const getOrderReceipt = async (ordersIDs: string[], name: string) => {
  const response = await api.post('/orders/receipts', { ordersIDs });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  FileSaver.saveAs(blob, `وصل طلبية ${name}.pdf`);
  return response.data;
};
