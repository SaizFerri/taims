import {
  Anchor,
  Box,
  Button,
  Container,
  Notification,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ArrowLeft, Check } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { Routes } from '../../constants/routes';
import { createAuthService } from '../../services/factory';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserProvider';

type LoginFormData = {
  email: string;
  password: string;
};

const authService = createAuthService();

export default function Login() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [view, setView] = useState<View>(View.LOGIN);
  const [resetLoading, setResetLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let from = (location.state as any)?.from?.pathname || Routes.INDEX;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = async ({ email, password }: LoginFormData) => {
    const user = await authService.signIn(email, password);

    if (user.error) {
      setError(user.error.message);
      return;
    }

    navigate(from, { replace: true });
  };

  const onPasswordReset = async ({ email }: Pick<LoginFormData, 'email'>) => {
    if (email) {
      setResetLoading(true);
      const sent = await authService.resetPassword(email);
      setResetLoading(false);

      if (!sent.error) {
        setSuccess(true);
        reset();
      }
    }
  };

  if (user) {
    return <Navigate to={from} replace />;
  }

  if (view === View.RESET_PASSWORD) {
    return (
      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Anchor component="button" onClick={() => setView(View.LOGIN)} size="sm">
            <Box
              sx={() => ({
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <ArrowLeft size={14} style={{ marginRight: 8 }} />
              {t('auth.backToLogin')}
            </Box>
          </Anchor>
          <form onSubmit={handleSubmit(onPasswordReset)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput id="email" label="E-mail" type="email" mt="md" required {...field} />
              )}
            />
            <Button type="submit" fullWidth mt="xl" loading={resetLoading}>
              {t('auth.resetPassword')}
            </Button>
          </form>
        </Paper>
        {success && (
          <Notification
            icon={<Check size={18} />}
            color="teal"
            title={t('auth.resetPasswordEmailSent')}
            p="md"
            mt="md"
            disallowClose
          ></Notification>
        )}
      </Container>
    );
  }

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title
          align="center"
          sx={(theme) => ({
            marginTop: '0!important',
            marginBottom: `${theme.spacing.xl}px !important`,
          })}
        >
          Welcome back
        </Title>
        <form onSubmit={handleSubmit(onLogin)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput id="email" label="E-mail" type="email" required mt="md" {...field} />
            )}
          />
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
            {t('auth.login')}
          </Button>
          {error && (
            <Text mt="sm" color="red">
              {error}
            </Text>
          )}
          <Anchor component="button" onClick={() => setView(View.RESET_PASSWORD)} size="sm" mt="md">
            {t('auth.forgotPassword')}
          </Anchor>
        </form>
      </Paper>
    </Container>
  );
}

const enum View {
  LOGIN,
  RESET_PASSWORD,
}
