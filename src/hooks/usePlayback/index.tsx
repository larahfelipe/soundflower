import React, { createContext, useContext, useState } from 'react';

import { AxiosResponse } from 'axios';
import { Audio } from 'expo-av';
import ytdl from 'react-native-ytdl';

import { defaultTrackData } from '@/constants';
import { api } from '@/services';
import {
  PlaybackContextProps,
  PlaybackProviderProps,
  PlaybackStatus,
  YtdlData,
  TrackData
} from '@/types';

const parseTrackFormats = async (trackId: string) => {
  const { formats }: YtdlData = await ytdl.getInfo(trackId);
  if (!formats)
    throw new Error('Could not find any formats for the requested track');

  let bestTrackFormatsAvailable = formats.filter(
    (track) => track.hasAudio && track.audioQuality !== 'AUDIO_QUALITY_LOW'
  );
  if (!bestTrackFormatsAvailable.length)
    bestTrackFormatsAvailable = formats.filter((track) => track.hasAudio);

  return bestTrackFormatsAvailable;
};

const PlaybackContext = createContext({} as PlaybackContextProps);

function PlaybackProvider({ children }: PlaybackProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState({} as PlaybackStatus);
  const [soundPlayer, setSoundPlayer] = useState({} as Audio.Sound);
  const [track, setTrack] = useState(defaultTrackData);

  const getTrack = async (track: string) => {
    const [trackTitle, trackArtist] = track
      .split('-')
      .map((item) => item.trim());

    try {
      if (!trackTitle || !trackArtist) return;
      setIsLoading(true);

      const { data }: AxiosResponse<TrackData> = await api.get(
        `track?title=${trackTitle}&artist=${trackArtist}&modules=getTrackInfo`
      );
      if (!data) throw new Error('No data was returned.');

      const trackFormats = await parseTrackFormats(data.videoId);

      if (!Object.keys(soundPlayer).length) {
        const soundPlayer = new Audio.Sound();
        await soundPlayer.loadAsync({
          uri: trackFormats[0].url
        });
        setSoundPlayer(soundPlayer);
      } else {
        setIsPlaying(false);
        await soundPlayer.unloadAsync();
        await soundPlayer.loadAsync({
          uri: trackFormats[0].url
        });
      }

      const parsedTrackData = data.albumTitle
        ? data
        : { ...defaultTrackData, ...data };
      setTrack(parsedTrackData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PlaybackContext.Provider
      value={{
        isLoading,
        isPlaying,
        setIsPlaying,
        playbackStatus,
        setPlaybackStatus,
        soundPlayer,
        getTrack,
        track
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

function usePlayback() {
  const context = useContext(PlaybackContext);

  return context;
}

export { PlaybackProvider, usePlayback };
