/* eslint-disable no-useless-catch */
import { api } from '@/api';
import FileSaver from 'file-saver';

export const getOrderReceipt = async (ordersIDs: number[], name: string) => {
  try {
    const response = await api.post('/orders/receipts', { ordersIDs });
    const contentType = response.headers['content-type'];
    if (contentType === 'application/pdf') {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, `وصل طلبية ${name}.pdf`);
      response.config.responseType = 'blob';
      return response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
