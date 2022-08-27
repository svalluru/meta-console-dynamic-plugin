import * as React from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import {
  useSidebarFormContext,
  useSidebarFormDispatchContext,
} from '../context/SidebarFormContextProvider';
import { setClusterValue } from '../reducer/SidebarFormReducer';

interface IProps {
  id: string;
  name: string;
  ariaLabel?: string;
}

export const ClusterDropdown = (props: IProps) => {
  const {
    sidebarFormState: { clusterValue },
  } = useSidebarFormContext();
  const dispatch = useSidebarFormDispatchContext();
  const onChange = (value: string) => {
    setClusterValue(dispatch, value);
  };

  const options = [
    { value: 'dev', label: 'Dev', disabled: false },
    { value: 'qa', label: 'QA', disabled: false },
  ];

  return (
    <FormSelect
      value={clusterValue}
      onChange={onChange}
      aria-label={props.ariaLabel || 'FormSelect select'}
      id={props.id}
      name={props.name}
    >
      {options.map((option, index) => (
        <FormSelectOption
          isDisabled={option.disabled}
          key={index}
          value={option.value}
          label={option.label}
        />
      ))}
    </FormSelect>
  );
};
