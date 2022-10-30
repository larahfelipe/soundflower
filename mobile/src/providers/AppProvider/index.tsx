import React, { createContext, useRef, useState } from 'react';

import { LogBox, Platform } from 'react-native';

import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  useFonts
} from '@expo-google-fonts/rubik';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import theme from '@/global/styles/theme';
import type { AppContextProps, AppProviderProps } from '@/types';

import { ApiProvider, TrackProvider } from '../';

LogBox.ignoreLogs([
  'react-native-ytdl is out of date! If the latest port is available, update with "npm install react-native-ytdl@latest"',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.'
]);

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [error, setError] = useState('');
  const platform = useRef(Platform.OS);

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />

      <AppContext.Provider value={{ error, setError, platform }}>
        <ApiProvider>
          <TrackProvider>{children}</TrackProvider>
        </ApiProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
};
