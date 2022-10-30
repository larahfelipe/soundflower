import React, { createContext, useCallback, useState } from 'react';

import { Audio } from 'expo-av';

import { useApp, useTrack } from '@/hooks';
import type {
  PlaybackPosition,
  PlaybackStatus,
  SoundPlayerContextProps,
  SoundPlayerProviderProps
} from '@/types';

export const SoundPlayerContext = createContext({} as SoundPlayerContextProps);

export const SoundPlayerProvider = ({ children }: SoundPlayerProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState({} as Audio.Sound);

  const { setError } = useApp();
  const { getTrack, getTrackFormats } = useTrack();

  const getSoundPlayerStatus = useCallback(async () => {
    let status = {} as PlaybackStatus;

    if (audioPlayer instanceof Audio.Sound)
      status = (await audioPlayer.getStatusAsync()) as PlaybackStatus;

    return status;
  }, [audioPlayer]);

  const setSoundPlayer = useCallback(
    async (trackStreamUrl: string) => {
      try {
        setIsAudioLoaded(false);

        const audioPermissions = await Audio.requestPermissionsAsync();
        if (!audioPermissions.granted)
          return setError(
            'Audio permissions were not granted. Please check the app settings'
          );

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true
        });

        if (audioPlayer instanceof Audio.Sound) {
          await audioPlayer.unloadAsync();
          const { isLoaded } = await audioPlayer.loadAsync({
            uri: trackStreamUrl
          });
          setIsAudioLoaded(isLoaded);
          return isLoaded;
        }

        const createdAudioPlayer = new Audio.Sound();
        const { isLoaded } = await createdAudioPlayer.loadAsync({
          uri: trackStreamUrl
        });

        setAudioPlayer(createdAudioPlayer);
        setIsAudioLoaded(isLoaded);

        return isLoaded;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    [audioPlayer, setError, setIsAudioLoaded]
  );

  const preparePlayback = useCallback(async (enteredTrack: string) => {
    if (!enteredTrack) {
      setError('Please enter a track and artist name');
      return;
    }

    try {
      setError('');

      const track = await getTrack(enteredTrack);

      const trackFormats = await getTrackFormats(track.videoId);
      const trackStreamUrls = [
        ...trackFormats.bestQuality.map((f) => f.url),
        ...trackFormats.worstQuality.map((f) => f.url)
      ];
      if (!trackStreamUrls.length) return;

      for (const streamUrl of trackStreamUrls) {
        const isLoaded = await setSoundPlayer(streamUrl);
        if (isLoaded) break;
        if (
          !isLoaded &&
          trackStreamUrls.indexOf(streamUrl) === trackStreamUrls.length - 1
        )
          setError('Could not load the track');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const togglePlayback = useCallback(async () => {
    if (audioPlayer instanceof Audio.Sound) {
      const playbackStatus = await audioPlayer.getStatusAsync();
      if (!playbackStatus.isLoaded) return;

      isPlaying
        ? await audioPlayer.pauseAsync()
        : await audioPlayer.playAsync();

      setIsPlaying(!isPlaying);
    }
  }, [audioPlayer, isPlaying]);

  const getPlaybackPosition = useCallback(async () => {
    let playbackPosition: PlaybackPosition = {
      positionMillis: 0,
      durationMillis: 0
    };

    if (audioPlayer instanceof Audio.Sound) {
      const { positionMillis, durationMillis } =
        (await audioPlayer.getStatusAsync()) as PlaybackStatus;

      playbackPosition = {
        positionMillis,
        durationMillis
      };
    }

    return playbackPosition;
  }, [audioPlayer]);

  const setPlaybackPosition = useCallback(
    async (positionMillis: number) => {
      if (audioPlayer instanceof Audio.Sound) {
        try {
          await audioPlayer.setPositionAsync(positionMillis);
        } catch (_) {
          // ignore
        }
      }
    },
    [audioPlayer]
  );

  return (
    <SoundPlayerContext.Provider
      value={{
        isPlaying,
        isAudioLoaded,
        getSoundPlayerStatus,
        preparePlayback,
        togglePlayback,
        getPlaybackPosition,
        setPlaybackPosition
      }}
    >
      {children}
    </SoundPlayerContext.Provider>
  );
};
