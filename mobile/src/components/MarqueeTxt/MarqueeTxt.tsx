import React from 'react';

import MarqueeText from 'react-native-marquee';
import { useTheme } from 'styled-components';

import type { MarqueeTxtProps } from './types';

export const MarqueeTxt = ({
  size = 16,
  children,
  ...props
}: MarqueeTxtProps) => {
  const { colors, fonts } = useTheme();

  return (
    <MarqueeText
      style={{
        width: '100%',
        fontSize: size,
        fontFamily: fonts.medium,
        color: colors.title
      }}
      {...props}
    >
      {children}
    </MarqueeText>
  );
};
