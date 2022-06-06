import PageHeader from 'components/PageHeader';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../DashboardLayout';

export default function Report() {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <PageHeader title={t('pages.report')} />
    </DashboardLayout>
  );
}
