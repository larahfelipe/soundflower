import React, { createContext, useCallback, useRef, useState } from 'react';

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
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState({} as Audio.Sound);
  const queue = useRef([] as string[]);
  const queuePointer = useRef(0);
  const _isPlaying = useRef(false);

  const { setError } = useApp();
  const { getTrack, getTrackFormats, unloadTrack } = useTrack();

  const getPointedTrackQueued = useCallback(
    () => queue.current[queuePointer.current],
    []
  );

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
    [audioPlayer, setError, setIsAudioLoaded]
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

  const processQueue = useCallback(
    async (shouldContinue = true) => {
      if (_isPlaying.current && !shouldContinue) return;

      try {
        setError('');

        const trackQueued = getPointedTrackQueued();
        if (!trackQueued) {
          await togglePlayback();
          await setPlaybackPosition(0);
          return;
        }

        const track = await getTrack(trackQueued);

        const trackFormats = await getTrackFormats(track.ytVideoId);
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
            unloadTrack();
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    [
      audioPlayer,
      togglePlayback,
      getPointedTrackQueued,
      getTrack,
      getTrackFormats,
      setError,
      setSoundPlayer,
      unloadTrack
    ]
  );

  const onPlaybackFinish = useCallback(async () => {
    if (isRepeatEnabled) {
      await setPlaybackPosition(0);
      setIsRepeatEnabled(false);
      return;
    }

    queuePointer.current++;
    await processQueue();
  }, [isRepeatEnabled, processQueue, setPlaybackPosition]);

  const enqueue = useCallback(
    async (enteredValue: string) => {
      if (!enteredValue) {
        setError('Please enter a track and artist name');
        return;
      }

      queue.current.push(enteredValue);
      await processQueue(false);
    },
    [setError, processQueue]
  );

  const shuffleQueue = useCallback(() => {
    if (!queue.current.length || queue.current.length === 1) return;

    queue.current.sort(() => Math.random() - 0.5);
  }, []);

  const previousTrack = useCallback(async () => {
    if (queuePointer.current === 0) return;

    queuePointer.current--;
    await processQueue();
  }, [processQueue]);

  const nextTrack = useCallback(async () => {
    if (queuePointer.current === queue.current.length - 1) return;

    queuePointer.current++;
    await processQueue();
  }, [processQueue]);

  const toggleRepeat = useCallback(
    () => setIsRepeatEnabled(!isRepeatEnabled),
    [isRepeatEnabled]
  );

  return (
    <SoundPlayerContext.Provider
      value={{
        isPlaying,
        isAudioLoaded,
        isRepeatEnabled,
        getSoundPlayerStatus,
        getPlaybackPosition,
        setPlaybackPosition,
        togglePlayback,
        onPlaybackFinish,
        enqueue,
        shuffleQueue,
        previousTrack,
        nextTrack,
        toggleRepeat
      }}
    >
      {children}
    </SoundPlayerContext.Provider>
  );
};
