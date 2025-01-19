

import React from 'react';
import { Slot } from 'expo-router';
export { ErrorBoundary } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

import AppProvider from '@/components/authentication/Provider';
import useInitializeApp from '@/hooks/useInitializeApp';

import 'react-native-reanimated';

configureReanimatedLogger({ level: ReanimatedLogLevel.warn, strict: false });

const AppLoading: React.FC = () => {
  const isInitialized = useInitializeApp();

  if (!isInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider> 
        <Slot />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const RootLayout = () => {
  return (
      <AppProvider>
        <AppLoading />
      </AppProvider>
  );
};

export default RootLayout;