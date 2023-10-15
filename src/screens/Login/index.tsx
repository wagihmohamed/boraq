import { TextInput, PasswordInput, Title, Button } from '@mantine/core';
import Logo from '@/assets/auth-image.png';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { SignInRequest, signInService } from '@/services/signInService';
import { useAuth } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';

const schema = z.object({
  usename: z.string().min(4, { message: 'البريد الالكتروني غير صحيح' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب ان تكون اكثر من 6 احرف' }),
});

export const LoginScreen = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ password, username }: SignInRequest) => {
      return signInService({ password, username });
    },
    onSuccess: (data) => {
      toast('تم تسجيل الدخول بنجاح');
      navigate('/home');
      setAuth(data);
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      usename: '',
      password: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    login({ password: values.password, username: values.usename });
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col justify-center items-center px-10 bg-background border-l border-border"
      >
        <Title order={2} ta="center" mt="md" mb={50}>
          مرحبا بك لوحة التحكم!
        </Title>

        <TextInput
          label="البريد الالكتروني"
          placeholder=""
          size="md"
          className="w-full"
          {...form.getInputProps('usename')}
        />
        <PasswordInput
          label="كلمة المرور"
          placeholder=""
          mt="md"
          size="md"
          className="w-full"
          {...form.getInputProps('password')}
        />
        <Button loading={isLoading} type="submit" fullWidth mt="xl" size="md">
          تسجيل الدخول
        </Button>
      </form>
      <img
        src={Logo}
        alt="logo"
        className="hidden md:block h-full object-contain md:col-span-1 lg:col-span-2 aspect-auto"
      />
    </div>
  );
};
