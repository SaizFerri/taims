import { Box, createStyles, ScrollArea } from '@mantine/core';
import useEntries from 'hooks/api/useEntries';
import { Entry } from 'types/entry';
import EntryItem from './EntryItem';
import { useUser } from './UserProvider';

export default function EntryList() {
  const { classes } = useStyles();
  const { user } = useUser();
  const { data: entries = [] } = useEntries(user?.id);

  return (
    <ScrollArea style={{ height: 'calc(100vh - 98px)' }}>
      <Box className={classes.list}>
        {entries.filter((entry) => !entry.active).map((entry: Entry) => (
          <EntryItem key={entry.id} entry={entry} />
        ))}
      </Box>
    </ScrollArea>
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

  list: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing.sm,
  },

  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  dimmed: {
    color: theme.colors.gray[7],
  },

  content: {
    display: 'flex',
    alignItems: 'center',
  },

  description: {
    marginRight: theme.spacing.lg,
  },

  project: {
    display: 'flex',
    alignItems: 'center',

    svg: {
      marginRight: theme.spacing.xs,
    },
  },

  timeInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  timeRange: {
    marginRight: theme.spacing.md,
    color: theme.colors.gray[5],
  },

  contextMenu: {
    marginLeft: theme.spacing.sm,
  },
}));
