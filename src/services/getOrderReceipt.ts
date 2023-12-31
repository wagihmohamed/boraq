import { api } from '@/api';
import { AxiosError } from 'axios';
import FileSaver from 'file-saver';

// eslint-disable-next-line consistent-return
export const getOrderReceipt = async (ordersIDs: number[], name: string) => {
  try {
    const response = await api.post(
      '/orders/receipts',
      { ordersIDs },
      {
        responseType: 'arraybuffer',
      }
    );
    const contentType = response.headers['content-type'];
    if (contentType === 'application/pdf') {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, `وصل طلبية ${name}.pdf`);
      response.config.responseType = 'blob';
      return response.data;
    }
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const data = JSON.parse(new TextDecoder().decode(error.response?.data));
      throw data;
    }
  }
};
