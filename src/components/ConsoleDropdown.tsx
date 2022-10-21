import React, { useMemo } from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import { filter, find, map } from 'lodash';
import {
  useSidebarFormContext,
  useSidebarFormDispatchContext,
} from '../context/SidebarFormContextProvider';
import { setConsoleValue } from '../reducer/SidebarFormReducer';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { IRoute } from '../models/appModel';
import { getRouteWebUrl } from '../utils/appUtils';

interface IProps {
  id: string;
  name: string;
  ariaLabel?: string;
}

export const ConsoleDropdown = (props: IProps) => {
  const {
    sidebarFormState: { selectedProject, selectedConsole },
  } = useSidebarFormContext();
  const dispatch = useSidebarFormDispatchContext();

  const [allRoutes] = useK8sWatchResource<IRoute[]>({
    kind: 'Route',
    isList: true,
  });
  const projectRoutes = filter(
    allRoutes,
    (r) => r?.metadata?.namespace === selectedProject?.metadata?.name,
  );
  const consoles = map(projectRoutes, (pr) => {
    pr.spec.url = getRouteWebUrl(pr);
    return pr;
  });
  const consoleURLList = useMemo(() => {
    return map(consoles ?? [], (item) => {
      return {
        value: item.spec.url,
        label: item.spec.url,
      };
    });
  }, [consoles]);

  const onChange = (value: string) => {
    const console = find(consoles, (n) => n.spec.url === value);
    setConsoleValue(dispatch, console);
  };

  return (
    <FormSelect
      value={selectedConsole?.spec?.url}
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
