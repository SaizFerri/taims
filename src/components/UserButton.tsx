import { Avatar, Group, Skeleton, Text, UnstyledButton } from '@mantine/core';
import React, { ForwardedRef, forwardRef } from 'react';
import { ChevronRight, User } from 'react-feather';

function UserButton(
  { image, name, email, icon, ...others }: UserButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        borderRadius: theme.radius.sm,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group noWrap>
        {image ? (
          <Avatar src={image} radius="xl" />
        ) : (
          <Avatar color="yellow" radius="xl">
            <User />
          </Avatar>
        )}

        <div style={{ flex: 1 }}>
          {name ? (
            <Text size="sm" weight={500}>
              {name}
            </Text>
          ) : (
            <Skeleton height={18} />
          )}

          {email ? (
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          ) : (
            <Skeleton height={18} mt={4} />
          )}
        </div>

        {icon || <ChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  );
}

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string;
  name?: string;
  email?: string;
  icon?: React.ReactNode;
}

export default forwardRef(UserButton);
