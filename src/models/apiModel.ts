export interface FFinalizers {}

export interface FSpec {
  "f:finalizers": FFinalizers;
}

export interface FieldsV1 {
  "f:metadata": {};
  "f:spec": FSpec;
}
export interface ManagedField {
  manager: string;
  operation: string;
  apiVersion: string;
  time: Date;
  fieldsType: string;
  fieldsV1: FieldsV1;
  subresource: string;
}
export interface OwnerReference {
  apiVersion: string;
  kind: string;
  name: string;
  uid: string;
  controller?: boolean;
  blockOwnerDeletion?: boolean;
}
export interface Metadata2 {
  name: string;
  uid: string;
  resourceVersion: string;
  creationTimestamp: Date;
  labels: any;
  annotations: any;
  managedFields: ManagedField[];
  ownerReferences: OwnerReference[];
}

export interface Spec {
  finalizers: string[];
  host: string;
  path: string;
  wildcardPolicy: string;
}
export interface Status {
  phase: string;
}
export interface Item {
  metadata: Metadata2;
  spec: Spec;
  status: Status;
}
export interface Metadata {}

export interface IProjects {
  kind: string;
  apiVersion: string;
  metadata: Metadata;
  items: Item[];
}

export interface IConsole {
  kind: string;
  apiVersion: string;
  metadata: Metadata;
  items: Item[];
}
