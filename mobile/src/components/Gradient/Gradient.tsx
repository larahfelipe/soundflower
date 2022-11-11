import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import { FadeEntry } from '../Animated';
import type { GradientProps } from './types';

export const Gradient = ({ w, h, children, ...props }: GradientProps) => {
  return (
    <FadeEntry fromOpacity={0} toOpacity={1}>
      <LinearGradient
        style={{
          width: w ?? '100%',
          height: h ?? '100%'
        }}
        {...props}
      >
        {children}
      </LinearGradient>
    </FadeEntry>
  );
};
