import { Badge, Box, Button, createStyles, Menu, Text, UnstyledButton } from '@mantine/core';
import React from 'react';
import { Edit, MoreHorizontal, Plus, Trash } from 'react-feather';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../DashboardLayout';
import AddProjectDialog from '../dialogs/AddProjectDialog';
import PageHeader, { Justify } from '../PageHeader';
import { useDisclosure } from '@mantine/hooks';
import useGetProjects from '../../hooks/api/useGetProjects';
import useDeleteProject from '../../hooks/api/useDeleteProject';

export default function Projects() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const [isOpen, handler] = useDisclosure(false);
  const { data: projects } = useGetProjects();
  const { mutate: deleteProject } = useDeleteProject();

  return (
    <DashboardLayout>
      <PageHeader title={t('pages.projects')} justify={Justify.END}>
        <Button leftIcon={<Plus size={20} />} onClick={handler.open}>
          New project
        </Button>
      </PageHeader>
      <Box>
        {projects?.map((project) => (
          <Box key={project.id} className={classes.client}>
            <Text component="span">
              {project.name} ({project.client?.name})
            </Text>
            <Badge color="green" radius="sm" size="lg" className={classes.badge}>
              {project.rate} {project.currency}$
            </Badge>
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
                  deleteProject(project.id);
                }}
              >
                {t('global.delete')}
              </Menu.Item>
            </Menu>
          </Box>
        ))}
      </Box>
      <AddProjectDialog isOpen={isOpen} onClose={handler.close} />
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
    marginLeft: theme.spacing.md,

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
  badge: {
    span: {
      margin: 0,
    },
  },
}));