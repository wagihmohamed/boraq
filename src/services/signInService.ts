import { api } from '@/api';
import { signInUrl } from '@/api/apisUrl';

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  status: string;
  token: string;
}

export const signInService = async (data: SignInRequest) => {
  const response = await api.post<SignInResponse>(signInUrl, data);
  return response.data;
};
