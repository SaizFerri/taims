import { Square } from 'react-feather';
import BasePlayButton from './BasePlayButton';

export default function StopButton({ onClick }: StopButtonProps) {
  return (
    <BasePlayButton
      sx={(theme) => ({
        backgroundColor: theme.colors.red[9],
        border: `4px solid ${theme.colors.red[7]}`,
      })}
      onClick={onClick}
    >
      <Square />
    </BasePlayButton>
  );
}

interface StopButtonProps {
  onClick: () => void;
}