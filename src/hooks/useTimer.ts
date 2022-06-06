import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useCallback, useRef, useState } from 'react';

dayjs.extend(utc);

const INTERVAL = 1000;

export default function useTimer() {
  const [elapsed, setElapsed] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef<boolean>(false);
  const expectedRef = useRef<number>(0);

  const start = useCallback(
    (started?: number) => {
      const now = dayjs.utc().valueOf();
      const startedAt = started ?? now;
      const interval = INTERVAL;
      expectedRef.current = now + interval;

      setElapsed((expectedRef.current - startedAt) / INTERVAL);
      cancelledRef.current = false;
      timerRef.current = setTimeout(step, interval);

      function step() {
        const now = dayjs.utc().valueOf();
        const dt = now - expectedRef.current;
        expectedRef.current += interval;

        if (cancelledRef.current) {
          clearTimeout(timerRef.current as any);
          return;
        }

        setElapsed((expectedRef.current - startedAt) / INTERVAL);
        timerRef.current = setTimeout(step, Math.max(0, interval - dt));
      }
    },
    [setElapsed, timerRef, expectedRef, cancelledRef]
  );

  const stop = useCallback(() => {
    cancelledRef.current = true;
    setElapsed(0);
    clearTimeout(timerRef.current as any);
  }, [timerRef, cancelledRef]);

  return { elapsed, start, stop };
}
