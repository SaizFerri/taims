import { Button, Modal, NumberInput, Text, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useCreateProject from '../../hooks/api/useCreateProject';
import useProfile from '../../hooks/api/useProfile';
import { ModalProps } from '../../types/modal';
import { ProjectDto } from '../../types/project';
import ClientsSelect from '../ClientsSelect';
import ErrorBoundary from '../ErrorBoundary';

export default function AddProjectDialog({ isOpen, onClose }: ModalProps) {
  const onSuccess = () => {
    reset();
    onClose();
  };

  const { t } = useTranslation();
  const mutation = useCreateProject(onSuccess);
  const profile = useProfile();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectDto>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: ProjectDto) => {
    mutation.mutate({
      ...data,
      client: Number(data.client),
      organization: profile?.selected_organization,
    });
  };

  return (
    <ErrorBoundary>
      <Modal
        opened={isOpen}
        onClose={onClose}
        title={
          <Text size="lg" weight={700}>
            {t('addProjectModal.title')}
          </Text>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please enter a name',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                error={errors.name?.message}
                placeholder="Name"
                label="Name"
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="client"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please select a client',
              },
            }}
            render={({ field }) => (
              <ClientsSelect {...field} error={errors.client?.message} required mt="md" />
            )}
          />
          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <NumberInput {...field} placeholder="Rate" label="Rate" mt="md" autoComplete="off" />
            )}
          />
          <Button type="submit" mt="lg">
            {t('global.create')}
          </Button>
        </form>
      </Modal>
    </ErrorBoundary>
  );
}
