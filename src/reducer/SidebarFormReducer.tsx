import { IAction } from '../models/shared';
import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { IRoute } from '../models/appModel';
export interface ISidebarFormState {
  clusterValue: string;
  selectedProject?: K8sResourceCommon;
  selectedConsole?: IRoute;
  tabs?: IRoute[];
  activeTabKey?: number;
}

// Constants
export enum SidebarFormReducerConstants {
  setClusterValue = 'setClusterValue',
  setProjectValue = 'setProjectValue',
  setConsoleValue = 'setConsoleValue',
  setTabsValue = 'setTabsValue',
  setActiveKeyIndexValue = 'setActiveKeyIndexValue',
}

type IActionType = IAction<SidebarFormReducerConstants, ISidebarFormState>;
export type SidebarFormReducerDispatchType = (value: IActionType) => void;
export const initialSidebarState: ISidebarFormState = {
  clusterValue: '',
  selectedProject: {},
  selectedConsole: {},
  tabs: [],
  activeTabKey: 0,
};

// Reducer
export const SidebarFormStateReducer = (
  pState: ISidebarFormState,
  action: IActionType,
): ISidebarFormState => {
  switch (action.type) {
    case SidebarFormReducerConstants.setClusterValue: {
      return { ...pState, clusterValue: action.payload.clusterValue };
    }
    case SidebarFormReducerConstants.setProjectValue: {
      return { ...pState, selectedProject: action.payload.selectedProject };
    }
    case SidebarFormReducerConstants.setConsoleValue: {
      return { ...pState, selectedConsole: action.payload.selectedConsole };
    }
    case SidebarFormReducerConstants.setTabsValue: {
      return { ...pState, tabs: action.payload.tabs };
    }
    case SidebarFormReducerConstants.setActiveKeyIndexValue: {
      return { ...pState, activeTabKey: action.payload.activeTabKey };
    }
    default: {
      return pState;
    }
  }
};

// Actions

export const setClusterValue = (
  dispatch: SidebarFormReducerDispatchType,
  clusterValue: string,
) => {
  dispatch({
    type: SidebarFormReducerConstants.setClusterValue,
    payload: { clusterValue },
  });
};

export const setProjectValue = (
  dispatch: SidebarFormReducerDispatchType,
  selectedProject: K8sResourceCommon,
) => {
  dispatch({
    type: SidebarFormReducerConstants.setProjectValue,
    payload: { selectedProject },
  });
};

export const setConsoleValue = (
  dispatch: SidebarFormReducerDispatchType,
  selectedConsole: IRoute,
) => {
  dispatch({
    type: SidebarFormReducerConstants.setConsoleValue,
    payload: { selectedConsole },
  });
};

export const setTabsValue = (
  dispatch: SidebarFormReducerDispatchType,
  tabs: IRoute[],
) => {
  dispatch({
    type: SidebarFormReducerConstants.setTabsValue,
    payload: { tabs },
  });
};

export const setActiveKeyIndexValue = (
  dispatch: SidebarFormReducerDispatchType,
  activeTabKey: number,
) => {
  dispatch({
    type: SidebarFormReducerConstants.setActiveKeyIndexValue,
    payload: { activeTabKey },
  });
};
