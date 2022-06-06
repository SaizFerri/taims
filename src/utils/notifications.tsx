import { showNotification } from '@mantine/notifications';
import { X } from 'react-feather';
import i18n from 'i18n';

type Notification = {
  id: string;
  autoClose?: number;
  title: string;
  message?: string;
};

export function showErrorNotification({
  id,
  autoClose = 5000,
  title,
  message = i18n.t('errors.apiError'),
}: Notification) {
  showNotification({
    id: `${id}-error`,
    autoClose,
    title,
    color: 'red',
    radius: 'sm',
    message,
    icon: <X />,
  });
}
