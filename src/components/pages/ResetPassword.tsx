import { Button, Container, Paper, PasswordInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../constants/routes';
import { supabase } from '../../lib/supabase';

type ResetPasswordForm = {
  password: string;
};

export default function ResetPassword() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = ({ password }: ResetPasswordForm) => {
    const hash = location.hash.split('#')[1];

    const hashValues = hash.split('&').reduce<Record<string, any>>((values, current) => {
      const [key, value] = current.split('=');
      return {
        ...values,
        [key]: value,
      };
    }, {});

    if (hashValues.type === 'recovery' && hashValues.access_token) {
      if (password) {
        supabase.auth.api
          .updateUser(hashValues.access_token, { password: password })
          .then(onSuccess)
          .catch((e) => console.error(e));
      }
    }
  };

  const onSuccess = () => {
    reset();
    navigate(Routes.INDEX, { replace: true });
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="password"
                label="Password"
                required
                mt="md"
                {...field}
                error={errors.password?.message}
              />
            )}
          />
          <Button type="submit" fullWidth mt="xl">
            {t('auth.resetPassword')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
