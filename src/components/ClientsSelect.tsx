import { Select, SelectProps } from '@mantine/core';
import useGetClients from 'hooks/api/useGetClients';
import { ForwardedRef, forwardRef } from 'react';

export default forwardRef(function ClientsSelect(
  props: ClientsSelectProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { data: clients } = useGetClients();

  return (
    <Select
      ref={ref}
      label="Select a client"
      placeholder="Select one"
      {...props}
      data={(clients || []).map((client) => ({
        value: `${client.id}`,
        label: client.name,
      }))}
      value={props.value ? `${props.value}` : null}
    />
  );
});

interface ClientsSelectProps extends Partial<Omit<SelectProps, 'value'>> {
  value?: number;
}
