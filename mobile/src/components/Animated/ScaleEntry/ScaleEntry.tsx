import React from 'react';

import { MotiView } from 'moti';

import type { ScaleEntryProps } from './types';

export const ScaleEntry = ({
  fromScale,
  toScale,
  duration,
  children
}: ScaleEntryProps) => {
  return (
    <MotiView
      from={{ scale: fromScale ?? 0.9 }}
      animate={{ scale: toScale ?? 1 }}
      transition={{ type: 'timing', duration: duration ?? 1500 }}
    >
      {children}
    </MotiView>
  );
};
