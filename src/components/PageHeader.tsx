import { Box, createStyles, Text } from '@mantine/core';
import { ReactNode } from 'react';

export default function PageHeader({ title, justify = Justify.START, children }: PageHeaderProps) {
  const { classes } = useStyle();
  return (
    <Box component="header" className={classes.header}>
      <Text component="span" size="xl" weight={700} className={classes.title}>
        {title}
      </Text>
      <Box className={classes.content} sx={{ justifyContent: justify }}>
        {children}
      </Box>
    </Box>
  );
}

const useStyle = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    margin: `-${theme.spacing.md}px -${theme.spacing.md}px 0 -${theme.spacing.md}px`,
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginRight: theme.spacing.md,
  },
  content: {
    display: 'flex',
    flex: 1,
  },
}));


export const enum Justify {
  START = 'flex-start',
  END = 'flex-end',
}

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  justify?: Justify;
}
