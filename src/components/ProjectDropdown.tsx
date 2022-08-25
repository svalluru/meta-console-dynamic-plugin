import React, { useMemo } from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import { useGetProjectList } from '../hooks/SupportQueries';
import { map } from 'lodash';
import {
  useSidebarFormContext,
  useSidebarFormDispatchContext,
} from '../context/SidebarFormContextProvider';
import { setProjectValue } from '../reducer/SidebarFormReducer';

interface IProps {
  id: string;
  name: string;
  ariaLabel?: string;
}

export const ProjectDropdown = (props: IProps) => {
  const { data } = useGetProjectList();
  const {
    sidebarFormState: { projectValue },
  } = useSidebarFormContext();
  const dispatch = useSidebarFormDispatchContext();
  const projectNameList = useMemo(() => {
    return map(data?.items ?? [], (item) => {
      return {
        value: item?.metadata?.name,
        label: item?.metadata?.name,
      };
    });
  }, [data?.items]);

  const onChange = (value: string) => {
    setProjectValue(dispatch, value);
  };

  return (
    <FormSelect
      value={projectValue}
      onChange={onChange}
      aria-label={props.ariaLabel || 'FormSelect select'}
      id={props.id}
      name={props.name}
    >
      {map(projectNameList, (option, index) => (
        <FormSelectOption
          key={index}
          value={option.value}
          label={option.label}
        />
      ))}
    </FormSelect>
  );
};
