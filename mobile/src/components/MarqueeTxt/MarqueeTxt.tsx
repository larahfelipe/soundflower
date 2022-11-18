import React from 'react';

import MarqueeText from 'react-native-marquee';
import { useTheme } from 'styled-components';

import type { MarqueeTxtProps } from './types';

export const MarqueeTxt = ({
  size = 16,
  weight = 'normal',
  color: colorProp,
  children,
  ...props
}: MarqueeTxtProps) => {
  const { colors, fonts } = useTheme();

  const fontFamily = weight === 'bold' ? fonts.bold : fonts.regular;
  const color = colorProp ?? colors.title;

  return (
    <MarqueeText
      style={{
        fontSize: size,
        fontFamily,
        color
      }}
      {...props}
    >
      {children}
    </MarqueeText>
  );
};
