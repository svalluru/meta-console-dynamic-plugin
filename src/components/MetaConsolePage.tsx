import * as React from 'react';
import { GlobalWrapperProvider } from '../context/GlobalWrapperProvider';
import { AppLayout } from './AppLayout';
import './example.css';

export default function MetaConsolePage() {
  return (
    <GlobalWrapperProvider>
      <AppLayout>test</AppLayout>
    </GlobalWrapperProvider>
  );
}
