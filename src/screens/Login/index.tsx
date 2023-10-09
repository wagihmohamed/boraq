import { Paper, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import classes from './AuthenticationImage.module.css';

export const LoginScreen = () => {
  return (
    <div className={classes.wrapper}>
      <Paper pt={150} className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          مرحبا بك لوحة التحكم!
        </Title>

        <TextInput
          label="البريد الالكتروني"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          label="كلمة المرور"
          placeholder="******"
          mt="md"
          size="md"
        />
        <Button fullWidth mt="xl" size="md">
          تسجيل الدخول
        </Button>
      </Paper>
    </div>
  );
};
