import { Box, createStyles, TextInput, UnstyledButton } from '@mantine/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import useCreateEntry from 'hooks/api/useCreateEntry';
import useStopEntry from 'hooks/api/useStopEntry';
import useTimer from 'hooks/useTimer';
import { useState } from 'react';
import { DollarSign } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { showErrorNotification } from 'utils/notifications';
import useEffectOnce from '../hooks/useEffectOnce';
import { createEntryService } from '../services/factory';
import { EntryDto } from '../types/entry';
import PlayButton from './buttons/PlayButton';
import StopButton from './buttons/StopButton';
import ProjectsSelect from './ProjectsSelect';
import Timer from './Timer';
import { useUser } from './UserProvider';

dayjs.extend(utc);

const entryService = createEntryService();

export default function NewEntry({ entry }: NewEntryProps) {
  const { classes } = useSyles();
  const { user } = useUser();
  const { elapsed, start, stop } = useTimer();
  const { control, handleSubmit, reset, getValues, trigger } = useForm<EntryDto>({
    defaultValues: {
      billable: entry?.billable ?? true,
      description: entry?.description ?? '',
      project: entry?.project ?? null,
    },
    mode: 'onBlur',
  });
  const [activeEntry, setActiveEntry] = useState<EntryDto | null>(entry);
  const [active, setActive] = useState<boolean>(!!entry);
  const { mutateAsync: createEntry } = useCreateEntry();
  const { mutateAsync: stopEntry } = useStopEntry();

  useEffectOnce(() => {
    if (entry) {
      start(dayjs.utc(entry.start_at).valueOf());
    }
  });

  if (!user) {
    return null;
  }

  const startTimeEntry = async () => {
    const now = dayjs.utc();
    const { billable, description, project } = getValues();
    setActive(true);
    start();
    try {
      const entry = await createEntry({
        start: now.toISOString(),
        billable,
        description,
        project,
      });

      setActiveEntry(entry);
    } catch (error) {
      showErrorNotification({
        id: 'timer-start',
        title: 'Error starting timer',
      });
      reset();
    }
  };

  const stopTimeEntry = async () => {
    const now = dayjs.utc();

    if (!activeEntry) {
      return;
    }

    setActive(false);

    try {
      await stopEntry({
        entryId: activeEntry.id,
        endsAt: now.toISOString(),
        duration: now.unix() - dayjs.utc(activeEntry?.start_at).unix(),
      });

      stop();
      reset({
        billable: true,
        description: '',
        project: null,
      });
    } catch (error) {
      showErrorNotification({
        id: 'timer-stop',
        title: 'Error stoping timer',
      });
    }
  };

  const onSave = async (entry: EntryDto) => {
    if (activeEntry) {
      try {
        await entryService.updateEntry(activeEntry.id, { ...entry });
        setActiveEntry({ ...activeEntry, ...entry });
      } catch (error) {
        showErrorNotification({
          id: 'entry-update',
          title: 'Error updating entry',
        });
      }
    }
  };

  return (
    <Box component="form" className={classes.container} onBlur={handleSubmit(onSave)}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextInput {...field} className={classes.input} placeholder="Writing some code..." />
        )}
      />
      <Controller
        name="project"
        control={control}
        render={({ field }) => <ProjectsSelect {...field} clearable mr="md" />}
      />
      <Controller
        name="billable"
        control={control}
        render={({ field }) => (
          <UnstyledButton
            ref={field.ref}
            className={`${classes.billableButton} ${field.value ? 'is-active' : ''}`}
            onClick={() => {
              field.onChange(!field.value);
              trigger();
              onSave(getValues());
            }}
          >
            <DollarSign size={24} />
          </UnstyledButton>
        )}
      />

      <Timer className={classes.timer} weight={700} size="xl" seconds={elapsed} />
      {active ? <StopButton onClick={stopTimeEntry} /> : <PlayButton onClick={startTimeEntry} />}
    </Box>
  );
}

interface NewEntryProps {
  entry: EntryDto | null;
}

const useSyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  input: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  timer: {
    marginRight: theme.spacing.md,
  },
  billableButton: {
    marginRight: theme.spacing.md,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    '&:hover': {
      backgroundColor: theme.colors.gray[9],
    },
    '&.is-active': {
      backgroundColor: theme.colors.gray[8],
      svg: {
        stroke: theme.colors.green[9],
      },
    },
  },
}));