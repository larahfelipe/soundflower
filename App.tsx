import React from 'react';

import { LogBox } from 'react-native';

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold
} from '@expo-google-fonts/rubik';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import theme from '@/global/styles/theme';
import { PlaybackProvider } from '@/hooks';
import { Player } from '@/screens';

LogBox.ignoreLogs([
  'react-native-ytdl is out of date! If the latest port is available, update with "npm install react-native-ytdl@latest"'
]);

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <PlaybackProvider>
        <Player />
      </PlaybackProvider>
    </ThemeProvider>
  );
}
