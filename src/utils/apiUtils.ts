import axios from 'axios';
import { IConsole, IProjects } from '../models/apiModel';

const token = '';
const apiHost =
  'https://api.nokia.ocp-poc-demo.com:6443/apis/project.openshift.io/v1';

const getAPIConfig = (options = {}) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  };
};

export const getProjectLists = async (): Promise<IProjects> => {
  const response = await axios.get(`${apiHost}/projects`, getAPIConfig());
  return response.data;
};

export const getConsoleListByProjectName = async (
  projectName: string,
): Promise<IConsole> => {
  const response = await axios.get(
    `${apiHost}/namespaces/${projectName}/routes?labelSelector=type`,
    getAPIConfig(),
  );
  return response.data;
};
