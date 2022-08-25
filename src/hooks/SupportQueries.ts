import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { ReactQueryConstants } from "../enum/ReactQueryConstants";
import { IConsole, IProjects } from "../models/apiModel";
import {
  getConsoleListByProjectName,
  getProjectLists,
} from "../utils/apiUtils";

export function useGetProjectList(
  options?: UseQueryOptions<IProjects, Error>
): UseQueryResult<IProjects> {
  return useQuery<IProjects, Error>(
    [ReactQueryConstants.GET_PROJECT_LIST],
    () => getProjectLists(),
    options
  );
}

export function useGetConsoleByProjectName(
  projectName: string,
  options?: UseQueryOptions<IConsole, Error>
): UseQueryResult<IConsole> {
  return useQuery<IConsole, Error>(
    [ReactQueryConstants.GET_CONSOLE_LIST_BY_PROJECT_NAME, projectName],
    () => getConsoleListByProjectName(projectName),
    options
  );
}
