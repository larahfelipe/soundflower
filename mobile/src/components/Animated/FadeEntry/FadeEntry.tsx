import React from 'react';

import { MotiView } from 'moti';

import type { FadeEntryProps } from './types';

export const FadeEntry = ({
  fromOpacity,
  toOpacity,
  duration,
  children
}: FadeEntryProps) => {
  return (
    <MotiView
      from={{ opacity: fromOpacity ?? 0 }}
      animate={{ opacity: toOpacity ?? 1 }}
      transition={{ type: 'timing', duration: duration ?? 1500 }}
    >
      {children}
    </MotiView>
  );
};
