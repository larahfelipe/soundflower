import React from 'react';

import { AppProvider } from '@/providers';
import { Player } from '@/screens';

export default function App() {
  return (
    <AppProvider>
      <Player />
    </AppProvider>
  );
}
