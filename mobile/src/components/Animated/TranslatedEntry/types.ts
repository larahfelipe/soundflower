import type { ComponentProps } from '@/types';

type Axis = 'XAxis' | 'YAxis';

export type TranslatedEntryProps = ComponentProps & {
  on: Axis;
  from?: number;
  to?: number;
  duration?: number;
};
