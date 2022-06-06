import { ButtonProps, MantineTheme, UnstyledButton } from '@mantine/core';
import { ReactNode } from 'react';

export default function BasePlayButton({ children, sx, ...props }: BasePlayButtonProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        width: 50,
        minWidth: 50,
        height: 50,
        minHeight: 50,
        borderRadius: theme.spacing.xl,
        backgroundColor: theme.colors.green[9],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `4px solid ${theme.colors.green[7]}`,
        transition: 'all 150s ease',

        svg: {
          stroke: 'white',
        },

        '&:active': {
          borderWidth: '3px',
        },
        ...sx(theme),
      })}
      {...props}
    >
      {children}
    </UnstyledButton>
  );
}

interface BasePlayButtonProps extends ButtonProps<'button'> {
  children: ReactNode;
  sx: (theme: MantineTheme) => Record<string, string | number>;
}
