import { Box, createStyles, Text } from '@mantine/core';
import useDeleteEntry from 'hooks/api/useDeleteEntry';
import { Folder } from 'react-feather';
import { Entry } from 'types/entry';
import TimeUtils from 'utils/time';
import ContextMenu from './ContextMenu';
import Timer from './Timer';

export default function EntryItem({ entry }: EntryItemProps) {
  const { classes, cx } = useStyles();
  const { mutate: deleteEntry } = useDeleteEntry();
  
  return (
    <Box className={classes.item}>
      <Box className={classes.content}>
        <Text className={cx(classes.description, { [classes.dimmed]: !entry.description })}>
          {entry.description || 'No description'}
        </Text>
        {entry.project && (
          <Box className={classes.project}>
            <Folder size={14} />
            <Text component="span" size="sm">
              {entry.project?.name}
            </Text>
          </Box>
        )}
      </Box>
      <Box className={classes.timeInfo}>
        <Text component="span" size="sm" className={classes.timeRange}>
          {TimeUtils.toLocalTime(entry.start_at)}
          {entry.end_at && (
            <> - {TimeUtils.toLocalTime(entry.end_at)}</>
          )}
        </Text>
        {entry.duration && <Timer seconds={entry.duration} />}
        <Box className={classes.contextMenu}>
          <ContextMenu onEdit={() => null} onDelete={() => deleteEntry(entry.id)} />
        </Box>
      </Box>
    </Box>
  );
}

interface EntryItemProps {
  entry: Entry;
}

const useStyles = createStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing.sm,
  },

  item: {
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
