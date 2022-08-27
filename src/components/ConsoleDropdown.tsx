import React, { useMemo } from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import { useGetConsoleByProjectName } from '../hooks/SupportQueries';
import { map } from 'lodash';
import {
  useSidebarFormContext,
  useSidebarFormDispatchContext,
} from '../context/SidebarFormContextProvider';
import { setConsoleValue } from '../reducer/SidebarFormReducer';

interface IProps {
  id: string;
  name: string;
  ariaLabel?: string;
}

export const ConsoleDropdown = (props: IProps) => {
  const {
    sidebarFormState: { projectValue, consoleValue },
  } = useSidebarFormContext();
  const dispatch = useSidebarFormDispatchContext();
  const { data } = useGetConsoleByProjectName(projectValue, {
    enabled: projectValue ? true : false,
  });
  const consoleURLList = useMemo(() => {
    return map(data?.items ?? [], (item) => {
      return {
        value: item?.spec?.host,
        label: item?.spec?.host,
      };
    });
  }, [data?.items]);

  const onChange = (value: string) => {
    setConsoleValue(dispatch, value);
  };

  return (
    <FormSelect
      value={consoleValue}
      onChange={onChange}
      aria-label={props.ariaLabel || 'FormSelect select'}
      id={props.id}
      name={props.name}
    >
      {map(consoleURLList, (option, index) => (
        <FormSelectOption
          key={index}
          value={option.value}
          label={option.label}
        />
      ))}
    </FormSelect>
  );
};
