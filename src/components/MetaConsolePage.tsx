import * as React from 'react';
import { GlobalWrapperProvider } from '../context/GlobalWrapperProvider';
import { AppLayout } from './AppLayout';
import './example.css';
import { MainContentPage } from './MainContentPage';

export default function MetaConsolePage() {
  return (
    <GlobalWrapperProvider>
      <AppLayout>
        <MainContentPage />
      </AppLayout>
    </GlobalWrapperProvider>
  );
}
