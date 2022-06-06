import { Button, Modal, Text, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import useCreateClient from '../../hooks/api/useCreateClient';
import useProfile from '../../hooks/api/useProfile';
import { Client } from '../../types/client';
import { ModalProps } from '../../types/modal';
import ErrorBoundary from '../ErrorBoundary';

export default function AddClientDialog({ isOpen, onClose }: ModalProps) {
  const onSuccess = () => {
    onClose();
  };

  const mutation = useCreateClient(onSuccess);
  const profile = useProfile();
  const { control, handleSubmit } = useForm<Client>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: Client) => {
    if (profile) {
      mutation.mutate({ ...data, organization: profile.selected_organization ?? 0 });
    }
  };

  return (
    <ErrorBoundary>
      <Modal
        opened={isOpen}
        onClose={onClose}
        title={
          <Text size="lg" weight={700}>
            Create client
          </Text>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput {...field} placeholder="Name" label="Name" autoComplete="off" required />
            )}
          />
          <Button type="submit" mt="md">
            Create
          </Button>
        </form>
      </Modal>
    </ErrorBoundary>
  );
}
