import { Select, SelectProps } from '@mantine/core';
import { ForwardedRef, forwardRef } from 'react';
import { Nullable } from 'types/global';
import useGetProjects from '../hooks/api/useGetProjects';

export default forwardRef(function ProjectsSelect(
  props: ProjectsSelectProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { data } = useGetProjects();

  const items =
    data && data.length > 0
      ? data.map((project) => ({
          value: `${project.id}`,
          label: project.name,
        }))
      : [{ value: '-1', label: 'No project found', disabled: true }];

  return (
    <Select
      ref={ref}
      placeholder="Select one"
      {...props}
      data={items}
      value={props.value ? `${props.value}` : null}
    />
  );
});

interface ProjectsSelectProps extends Partial<Omit<SelectProps, 'value'>> {
  value?: Nullable<number>;
}
