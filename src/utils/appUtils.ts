import { isEmpty } from 'lodash';
import { IRoute } from '../models/appModel';

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
