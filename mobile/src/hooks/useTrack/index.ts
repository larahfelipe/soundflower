import { useContext } from 'react';

import { TrackContext } from '@/providers';

export const useTrack = () => {
  const context = useContext(TrackContext);

  return context;
};
