import { useContext } from 'react';

import { ApiContext } from '@/providers';

export const useApi = () => {
  const context = useContext(ApiContext);

  return context;
};
