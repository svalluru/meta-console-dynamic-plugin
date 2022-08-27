import { IAction } from "../models/shared";

export interface ISidebarFormState {
  clusterValue: string;
  projectValue?: string;
  consoleValue?: string;
}

// Constants
export enum SidebarFormReducerConstants {
  setClusterValue = "setClusterValue",
  setProjectValue = "setProjectValue",
  setConsoleValue = "setConsoleValue",
}

type IActionType = IAction<SidebarFormReducerConstants, ISidebarFormState>;
export type SidebarFormReducerDispatchType = (value: IActionType) => void;
export const initialSidebarState: ISidebarFormState = {
  clusterValue: "",
  projectValue: "",
  consoleValue: "",
};

// Reducer
export const SidebarFormStateReducer = (
  pState: ISidebarFormState,
  action: IActionType
): ISidebarFormState => {
  switch (action.type) {
    case SidebarFormReducerConstants.setClusterValue: {
      return { ...pState, clusterValue: action.payload.clusterValue };
    }
    case SidebarFormReducerConstants.setProjectValue: {
      return { ...pState, projectValue: action.payload.projectValue };
    }
    case SidebarFormReducerConstants.setConsoleValue: {
      return { ...pState, consoleValue: action.payload.consoleValue };
    }
    default: {
      return pState;
    }
  }
};

// Actions

export const setClusterValue = (
  dispatch: SidebarFormReducerDispatchType,
  clusterValue: string
) => {
  dispatch({
    type: SidebarFormReducerConstants.setClusterValue,
    payload: { clusterValue },
  });
};

export const setProjectValue = (
  dispatch: SidebarFormReducerDispatchType,
  projectValue: string
) => {
  dispatch({
    type: SidebarFormReducerConstants.setProjectValue,
    payload: { projectValue },
  });
};

export const setConsoleValue = (
  dispatch: SidebarFormReducerDispatchType,
  consoleValue: string
) => {
  dispatch({
    type: SidebarFormReducerConstants.setConsoleValue,
    payload: { consoleValue },
  });
};
