import React from 'react';

import { MotiView } from 'moti';

import type { TranslatedEntryProps } from './types';

export const TranslatedEntry = ({
  on,
  from,
  to,
  duration,
  children
}: TranslatedEntryProps) => {
  switch (on) {
    case 'XAxis':
      return (
        <MotiView
          from={{ translateX: from ?? -100 }}
          animate={{ translateX: to ?? 0 }}
          transition={{ type: 'timing', duration: duration ?? 1500 }}
        >
          {children}
        </MotiView>
      );
    case 'YAxis':
      return (
        <MotiView
          from={{ translateY: from ?? -100 }}
          animate={{ translateY: to ?? 0 }}
          transition={{ type: 'timing', duration: duration ?? 1500 }}
        >
          {children}
        </MotiView>
      );
    default:
      return <>{children}</>;
  }
};
