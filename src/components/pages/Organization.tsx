import PageHeader from 'components/PageHeader';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../DashboardLayout';

export default function Organization() {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <PageHeader title={t('pages.organization')} />
    </DashboardLayout>
  );
}
