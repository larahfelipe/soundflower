import { useContext } from 'react';

import { AppContext } from '@/providers';

export const useApp = () => {
  const context = useContext(AppContext);

  return context;
};
