import { Text, TextProps } from '@mantine/core';

export default function Timer({ seconds, ...props }: TimerProps) {
  const getHoursAndMinutes = (m: number, h = 0): [number, number] => {
    if (m <= 59) {
      return [h, m];
    }

    return getHoursAndMinutes(m - 60, h + 1);
  };

  const ss = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60);
  const [hh, mm] = getHoursAndMinutes(m);

  const getTimeString = (n: number) => {
    if (n <= 9) {
      return `0${n}`;
    }

    return n;
  };

  return (
    <Text component="span" {...props}>
      {hh}:{getTimeString(mm)}:{getTimeString(ss)}
    </Text>
  );
}

interface TimerProps extends TextProps<'span'> {
  seconds: number;
}
