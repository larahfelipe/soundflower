import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import type { GradientProps } from './types';

export const Gradient = ({ w, h, children, ...props }: GradientProps) => {
  return (
    <LinearGradient
      style={{
        width: w ?? '100%',
        height: h ?? '100%'
      }}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};
