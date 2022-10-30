import type { LinearGradientProps } from 'expo-linear-gradient';

import type { ComponentProps } from '@/types';

type Unit = 'px' | '%';

type Size = `${number}${Unit}`;

export type GradientProps = ComponentProps &
  LinearGradientProps & {
    w?: Size;
    h?: Size;
  };
