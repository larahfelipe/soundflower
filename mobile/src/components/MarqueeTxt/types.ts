import type { MarqueeTextProps } from 'react-native-marquee';

import type { ComponentProps } from '@/types';

export type MarqueeTxtProps = ComponentProps &
  MarqueeTextProps & {
    size?: number;
    color?: string;
    weight?: 'normal' | 'bold';
  };
