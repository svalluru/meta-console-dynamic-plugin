import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';

export type RouteTLS = {
  caCertificate?: string;
  certificate?: string;
  destinationCACertificate?: string;
  insecureEdgeTerminationPolicy?: string;
  key?: string;
  termination: string;
};

export type RouteTarget = {
  kind: 'Service';
  name: string;
  weight: number;
};

export interface IRoute extends K8sResourceCommon {
  spec?: {
    url?: string;
    host?: string;
    path?: string;
    port?: {
      targetPort: number | string;
    };
    subdomain?: string;
    tls?: RouteTLS;
    to: RouteTarget;
    wildcardPolicy?: string;
  };
}
