import { Play } from 'react-feather';
import BasePlayButton from './BasePlayButton';

export default function PlayButton({ onClick }: PlayButtonProps) {

  return (
    <BasePlayButton
      sx={(theme) => ({
        backgroundColor: theme.colors.green[9],
        border: `4px solid ${theme.colors.green[7]}`,
      })}
      onClick={onClick}
    >
      <Play />
    </BasePlayButton>
  );
}

interface PlayButtonProps {
  onClick: () => void;
}
