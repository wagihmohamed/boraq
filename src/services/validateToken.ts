import { api } from '@/api';
import { validateTokenendpoint } from '@/api/apisUrl';
import { authStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export const validateToken = async () => {
  try {
    const response = await api.post(validateTokenendpoint);
    return response;
  } catch (e) {
    authStore.getState().logout();
    toast.error('لقد انتهت صلاحية الجلسة الرجاء تسجيل الدخول مرة أخرى');
    throw e;
  }
};
