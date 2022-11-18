import React, { createContext, useCallback, useRef, useState } from 'react';

import { Audio } from 'expo-av';

import { useApp, useTrack } from '@/hooks';
import type {
  PlaybackPosition,
  PlaybackStatus,
  SoundPlayerContextProps,
  SoundPlayerProviderProps
} from '@/types';

import { useQueue } from '../../hooks/useQueue';

export const SoundPlayerContext = createContext({} as SoundPlayerContextProps);

export const SoundPlayerProvider = ({ children }: SoundPlayerProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState({} as Audio.Sound);
  const _isPlaying = useRef(false);

  const { setError } = useApp();
  const { getTrack, getTrackFormats, unloadTrack } = useTrack();
  const { getTrackQueued, manageQueue, getQueue, toggleShuffle, isShuffled } =
    useQueue();

  const getSoundPlayerStatus = useCallback(async () => {
    let status = {} as PlaybackStatus;

    if (audioPlayer instanceof Audio.Sound)
      status = (await audioPlayer.getStatusAsync()) as PlaybackStatus;

    return status;
  }, [audioPlayer]);

  const getPlaybackPosition = useCallback(async () => {
    let playbackPosition: PlaybackPosition = {
      positionMillis: 0,
      durationMillis: 0
    };

    if (audioPlayer instanceof Audio.Sound) {
      const { positionMillis, durationMillis } = await getSoundPlayerStatus();

      playbackPosition = {
        positionMillis,
        durationMillis
      };
    }

    return playbackPosition;
  }, [audioPlayer, getSoundPlayerStatus]);

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

          const { isLoaded } = await audioPlayer.loadAsync(
            { uri: trackStreamUrl },
            { shouldPlay: _isPlaying.current }
          );
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
    [audioPlayer, setError]
  );

  const togglePlayback = useCallback(async () => {
    if (audioPlayer instanceof Audio.Sound) {
      const playbackStatus = await getSoundPlayerStatus();
      if (!playbackStatus.isLoaded) return;

      isPlaying
        ? await audioPlayer.pauseAsync()
        : await audioPlayer.playAsync();

      setIsPlaying(!isPlaying);
      _isPlaying.current = !isPlaying;
    }
  }, [audioPlayer, getSoundPlayerStatus, isPlaying]);

  const processPlayback = useCallback(
    async (shouldContinue = true) => {
      if (_isPlaying.current && !shouldContinue) return;

      try {
        setError('');

        const trackQueued = getTrackQueued();
        if (!trackQueued) {
          await togglePlayback();
          await setPlaybackPosition(0);
          return;
        }

        const track = await getTrack(trackQueued);

        const trackFormats = await getTrackFormats(track.id);
        const trackStreamUrls = [
          ...trackFormats.bestQuality.map((f) => f.url),
          ...trackFormats.worstQuality.map((f) => f.url)
        ];
        if (!trackStreamUrls.length) {
          await audioPlayer.unloadAsync();
          return;
        }

        for (const streamUrl of trackStreamUrls) {
          const isLoaded = await setSoundPlayer(streamUrl);
          if (isLoaded) break;
          if (
            !isLoaded &&
            trackStreamUrls.indexOf(streamUrl) === trackStreamUrls.length - 1
          ) {
            setError('Could not load the track');
            manageQueue('remove', trackQueued);
            unloadTrack();
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    [
      audioPlayer,
      getTrack,
      getTrackFormats,
      getTrackQueued,
      manageQueue,
      setError,
      setSoundPlayer,
      togglePlayback,
      unloadTrack
    ]
  );

  const onPlaybackFinish = useCallback(async () => {
    if (isLooping) {
      await setPlaybackPosition(0);
      setIsLooping(false);
      return;
    }

    manageQueue('next');
    await processPlayback();
  }, [isLooping, manageQueue, processPlayback, setPlaybackPosition]);

  const enqueue = useCallback(
    async (enteredValue: string) => {
      if (!enteredValue) {
        setError('Please enter a track and artist name');
        return;
      }

      manageQueue('add', enteredValue);
      await processPlayback(false);
    },
    [manageQueue, processPlayback, setError]
  );

  const toggleRepeat = useCallback(() => {
    if (!getQueue().default.length) return;

    setIsLooping(!isLooping);
  }, [getQueue, isLooping]);

  const previousTrack = useCallback(async () => {
    if (getQueue().index === 0) return;

    if (isLooping) toggleRepeat();

    manageQueue('previous');
    await processPlayback();
  }, [getQueue, isLooping, toggleRepeat, manageQueue, processPlayback]);

  const nextTrack = useCallback(async () => {
    const queue = getQueue();
    if (queue.index === queue.default.length - 1) return;

    if (isLooping) toggleRepeat();

    manageQueue('next');
    await processPlayback();
  }, [getQueue, isLooping, toggleRepeat, manageQueue, processPlayback]);

  return (
    <SoundPlayerContext.Provider
      value={{
        isPlaying,
        isAudioLoaded,
        isLooping,
        isShuffled,
        getSoundPlayerStatus,
        getPlaybackPosition,
        setPlaybackPosition,
        togglePlayback,
        onPlaybackFinish,
        enqueue,
        toggleShuffle,
        previousTrack,
        nextTrack,
        toggleRepeat
      }}
    >
      {children}
    </SoundPlayerContext.Provider>
  );
};
