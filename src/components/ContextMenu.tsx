import { createStyles, Menu, UnstyledButton } from '@mantine/core';
import { Edit, MoreHorizontal, Trash } from 'react-feather';
import { useTranslation } from 'react-i18next';

export default function ContextMenu({ onEdit, onDelete }: ContextMenuProps) {
  const { t } = useTranslation();
  const { classes } = useStyles();
  return (
    <Menu
      control={
        <UnstyledButton className={classes.menuButton}>
          <MoreHorizontal size={20} />
        </UnstyledButton>
      }
    >
      <Menu.Item icon={<Edit size={14} />} onClick={onEdit}>
        {t('global.edit')}
      </Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />} onClick={onDelete}>
        {t('global.delete')}
      </Menu.Item>
    </Menu>
  );
}

interface ContextMenuProps {
  onEdit: () => void;
  onDelete: () => void;
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
}));
