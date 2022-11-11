import type { ComponentProps } from '@/types';

export type FadeEntryProps = ComponentProps & {
  fromOpacity?: number;
  toOpacity?: number;
  duration?: number;
};
