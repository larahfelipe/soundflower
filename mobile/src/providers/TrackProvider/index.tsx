import React, { createContext, useCallback, useState } from 'react';

import ytdl from 'react-native-ytdl';

import { AUDIO_QUALITY, DEFAULT_TRACK_DATA } from '@/constants';
import { useApi, useApp } from '@/hooks';
import type {
  Track,
  TrackContextProps,
  TrackFormats,
  TrackProviderProps,
  YtdlData
} from '@/types';

export const TrackContext = createContext({} as TrackContextProps);

export const TrackProvider = ({ children }: TrackProviderProps) => {
  const [track, setTrack] = useState(DEFAULT_TRACK_DATA);

  const { getTrackInfoByMetadata } = useApi();
  const { setError } = useApp();

  const getTrackFormats = useCallback(async (trackId: string) => {
    const formatsAvailable = {
      bestQuality: [],
      worstQuality: []
    } as TrackFormats;

    if (!trackId) {
      setError('Track ID was not received from the server');
      unloadTrack();
      return formatsAvailable;
    }

    const { formats }: YtdlData = await ytdl.getInfo(trackId);
    if (!formats.length) {
      setError('No compatible formats were found for this track');
      unloadTrack();
      return formatsAvailable;
    }

    formats
      .filter((f) => f.hasAudio)
      .forEach((f) =>
        f.audioQuality !== AUDIO_QUALITY.LOW
          ? formatsAvailable.bestQuality.push(f)
          : formatsAvailable.worstQuality.push(f)
      );

    return formatsAvailable;
  }, []);

  const getTrack = useCallback(
    async (trackMetadata: string) => {
      const data: Track = await getTrackInfoByMetadata(trackMetadata);
      if (!Object.keys(data).length)
        setError('Could not find any track for the given search');

      const trackData = data.album.title
        ? data
        : { ...DEFAULT_TRACK_DATA, ...data };

      setTrack(trackData);
      return trackData;
    },
    [track]
  );

  const unloadTrack = useCallback(() => setTrack(DEFAULT_TRACK_DATA), []);

  return (
    <TrackContext.Provider
      value={{ track, getTrack, getTrackFormats, unloadTrack }}
    >
      {children}
    </TrackContext.Provider>
  );
};
