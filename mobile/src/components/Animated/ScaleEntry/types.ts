import { ComponentProps } from '@/types';

export type ScaleEntryProps = ComponentProps & {
  fromScale?: number;
  toScale?: number;
  duration?: number;
};
