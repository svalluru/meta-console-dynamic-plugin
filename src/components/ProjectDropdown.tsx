import React, { useMemo } from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import { find, isEmpty, map } from 'lodash';
import {
  useSidebarFormContext,
  useSidebarFormDispatchContext,
} from '../context/SidebarFormContextProvider';
import { setProjectValue } from '../reducer/SidebarFormReducer';
import {
  useK8sWatchResource,
  K8sResourceCommon,
} from '@openshift-console/dynamic-plugin-sdk';
import { IRoute } from 'src/models/appModel';

interface IProps {
  id: string;
  name: string;
  ariaLabel?: string;
}

export const getRouteWebUrl = (resource: IRoute) => {
  if (isEmpty(resource)) {
    return '';
  }
  const scheme = resource?.spec?.tls?.termination ? 'https' : 'http';
  let url = `${scheme}://${resource.spec.host}`;
  if (resource.spec.path) {
    url += resource.spec.path;
  }
  return url;
};

export const ProjectDropdown = (props: IProps) => {
  const [namespace] = useK8sWatchResource<K8sResourceCommon[]>({
    kind: 'Namespace',
    isList: true,
  });

  const {
    sidebarFormState: { selectedProject },
  } = useSidebarFormContext();
  const dispatch = useSidebarFormDispatchContext();

  const projectNameList = useMemo(() => {
    return map(namespace ?? [], (item) => {
      return {
        value: item?.metadata?.name,
        label: item?.metadata?.name,
      };
    });
  }, [namespace]);

  const onChange = (value: string) => {
    const project = find(namespace, (n) => n.metadata.name === value);
    setProjectValue(dispatch, project);
  };

  return (
    <FormSelect
      value={selectedProject?.metadata?.name}
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
