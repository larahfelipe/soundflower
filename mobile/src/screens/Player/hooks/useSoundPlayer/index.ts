import { useContext } from 'react';

import { SoundPlayerContext } from '../../providers';

export const useSoundPlayer = () => {
  const context = useContext(SoundPlayerContext);

  return context;
};
