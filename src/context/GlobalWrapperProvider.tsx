import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SidebarFormContextProvider } from './SidebarFormContextProvider';

const overrides = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
};
const queryClient = new QueryClient(overrides);
interface IProps {
  children: JSX.Element | JSX.Element[];
}
export function GlobalWrapperProvider(props: IProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarFormContextProvider>{props.children}</SidebarFormContextProvider>
    </QueryClientProvider>
  );
}
