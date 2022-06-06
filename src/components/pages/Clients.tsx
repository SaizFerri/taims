import { Box, Button, createStyles, Menu, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit, MoreHorizontal, Plus, Trash } from 'react-feather';
import { useTranslation } from 'react-i18next';
import useDeleteClient from '../../hooks/api/useDeleteClient';
import useGetClients from '../../hooks/api/useGetClients';
import DashboardLayout from '../DashboardLayout';
import AddClientDialog from '../dialogs/AddClientDialog';
import PageHeader, { Justify } from '../PageHeader';

export default function Clients() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const [isOpen, handler] = useDisclosure(false);
  const { data: clients } = useGetClients();
  const deleteClient = useDeleteClient();

  return (
    <DashboardLayout>
      <PageHeader title={t('pages.clients')} justify={Justify.END}>
        <Button leftIcon={<Plus size={20} />} onClick={handler.open}>
          New client
        </Button>
      </PageHeader>
      <Box>
        {clients?.map((client) => (
          <Box key={client.id} className={classes.client}>
            <Text component="span">{client.name}</Text>
            <Menu
              control={
                <UnstyledButton className={classes.menuButton}>
                  <MoreHorizontal size={20} />
                </UnstyledButton>
              }
            >
              <Menu.Item icon={<Edit size={14} />}>{t('global.edit')}</Menu.Item>
              <Menu.Item
                color="red"
                icon={<Trash size={14} />}
                onClick={() => {
                  deleteClient.mutate(client.id);
                }}
              >
                {t('global.delete')}
              </Menu.Item>
            </Menu>
          </Box>
        ))}
      </Box>
      <AddClientDialog isOpen={isOpen} onClose={handler.close} />
    </DashboardLayout>
  );
}

const useStyles = createStyles((theme) => ({
  menuButton: {
    width: 28,
    minWidth: 28,
    height: 28,
    minHeight: 28,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    transition: 'all 100ms ease',

    '&:hover': {
      backgroundColor: theme.colors.dark[9],
    },
  },
  client: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.sm}px`,
    margin: `${theme.spacing.md}px 0`,
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,

    span: {
      marginRight: theme.spacing.sm,
    },
  },
}));