import React, { createContext, useCallback, useState } from 'react';

import type { AxiosResponse } from 'axios';

import { api } from '@/services';
import type { ApiContextProps, ApiProviderProps, Track } from '@/types';

export const ApiContext = createContext({} as ApiContextProps);

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getTrackInfoByMetadata = useCallback(async (payload: string) => {
    try {
      setIsLoading(true);

      const { data }: AxiosResponse<Track> = await api.get(
        `https://jsonurl.com/QyU3`
      );

      return data ?? {};
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ApiContext.Provider value={{ isLoading, getTrackInfoByMetadata }}>
      {children}
    </ApiContext.Provider>
  );
};
