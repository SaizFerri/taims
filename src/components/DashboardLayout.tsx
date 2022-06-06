import {
  AppShell,
  Box,
  createStyles,
  Menu,
  Navbar,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { Activity, Briefcase, Calendar, Clock, Icon, LogOut, Settings, User, Users } from 'react-feather';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../constants/routes';
import { createAuthService } from '../services/factory';
import UserButton from './UserButton';
import { useUser } from './UserProvider';
import useProfile from '../hooks/api/useProfile';

const authService = createAuthService();

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useUser();
  const profile = useProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 300 }}
          p="xs"
          className={classes.navbar}
          hidden
          hiddenBreakpoint="md"
        >
          <Navbar.Section grow component={ScrollArea}>
            <Link to={Routes.INDEX}>
              <NavLink
                icon={Clock}
                label={t('pages.timer')}
                isActive={location.pathname === Routes.INDEX}
              />
            </Link>
            <Link to={Routes.REPORT}>
              <NavLink
                icon={Activity}
                label={t('pages.report')}
                isActive={location.pathname === Routes.REPORT}
              />
            </Link>
            <Link to={Routes.PROJECTS}>
              <NavLink
                icon={Calendar}
                label={t('pages.projects')}
                isActive={location.pathname === Routes.PROJECTS}
              />
            </Link>
            <Link to={Routes.CLIENTS}>
              <NavLink
                icon={Users}
                label={t('pages.clients')}
                isActive={location.pathname === Routes.CLIENTS}
              />
            </Link>
            <Link to={Routes.ORGANIZATION}>
              <NavLink
                icon={Briefcase}
                label={t('pages.organization')}
                isActive={location.pathname === Routes.ORGANIZATION}
              />
            </Link>
          </Navbar.Section>
          <Navbar.Section className={classes.footer}>
            <Menu
              sx={{ width: '100%' }}
              placement="end"
              control={
                <UserButton
                  name={profile?.username ?? 'Username'}
                  email={user?.email}
                />
              }
            >
              <Menu.Item component={Link} to={Routes.PROFILE} icon={<User size={14} />}>{t('global.profile')}</Menu.Item>
              <Menu.Item component={Link} to={Routes.SETTINGS} icon={<Settings size={14} />}>{t('global.settings')}</Menu.Item>
              <Menu.Item
                color="blue"
                icon={<LogOut size={14} />}
                onClick={async () => {
                  await authService.signOut();
                  navigate(Routes.LOGIN);
                }}
              >
                {t('auth.logout')}
              </Menu.Item>
            </Menu>
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

function NavLink({ icon: Icon, label, isActive = false, ...props }: NavLinkProps) {
  return (
    <UnstyledButton
      component="div"
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        borderRadius: theme.radius.sm,

        '&.is-active': {
          backgroundColor: theme.colors.dark[8],
        },

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      className={`${isActive ? 'is-active' : ''}`}
      {...props}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
        <Text color="gray" ml="md">
          {label}
        </Text>
      </Box>
    </UnstyledButton>
  );
}

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface NavLinkProps {
  icon: Icon;
  label: string;
  isActive?: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
}
