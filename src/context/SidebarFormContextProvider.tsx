import * as React from 'react';
import { createContext, useContext, useReducer } from 'react';
import {
  initialSidebarState,
  ISidebarFormState,
  SidebarFormReducerDispatchType,
  SidebarFormStateReducer,
} from '../reducer/SidebarFormReducer';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

interface ISidebarFormContext {
  sidebarFormState: ISidebarFormState;
}

const initialSidebarFormContext: ISidebarFormContext = {
  sidebarFormState: initialSidebarState,
};
const initalDispatchContext = null;

export const SidebarFormContext = createContext(initialSidebarFormContext);
export const SidebarFormDispatchContext = createContext(initalDispatchContext);

export const useSidebarFormContext = () =>
  useContext<ISidebarFormContext>(SidebarFormContext);
export const useSidebarFormDispatchContext = () =>
  useContext<SidebarFormReducerDispatchType>(SidebarFormDispatchContext);

export function SidebarFormContextProvider(props: IProps) {
  const [sidebarFormState, dispatch] = useReducer(
    SidebarFormStateReducer,
    initialSidebarState,
  );
  return (
    <SidebarFormContext.Provider value={{ sidebarFormState }}>
      <SidebarFormDispatchContext.Provider value={dispatch}>
        {props.children}
      </SidebarFormDispatchContext.Provider>
    </SidebarFormContext.Provider>
  );
}
