import { useCallback, useEffect, useState } from 'react';

import { useApp, useTrack } from '@/hooks';

import { useSoundPlayer } from '../../../hooks';

export const useProgress = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [stepValue, setStepValue] = useState(0);

  const { platform } = useApp();
  const { track } = useTrack();
  const {
    getSoundPlayerStatus,
    getPlaybackPosition,
    setPlaybackPosition,
    onPlaybackFinish,
    isPlaying
  } = useSoundPlayer();

  const onValueChange = async (value: number) =>
    await setPlaybackPosition(value);

  const onMount = useCallback(async () => {
    const { durationMillis, progressUpdateIntervalMillis } =
      await getSoundPlayerStatus();

    const parsedDurationMillis =
      platform.current === 'ios' ? durationMillis / 2 : durationMillis;

    setTotalValue(parsedDurationMillis || 0);
    setStepValue(progressUpdateIntervalMillis);
  }, [getSoundPlayerStatus]);

  const updateCurrentPosition = useCallback(async () => {
    const { positionMillis } = await getPlaybackPosition();
    if (positionMillis >= totalValue) {
      await onPlaybackFinish();
      return;
    }

    setCurrentValue(positionMillis);
  }, [getPlaybackPosition, onPlaybackFinish, totalValue]);

  useEffect(() => void onMount(), [onMount]);

  useEffect(() => {
    if (!isPlaying) return;

    const updateInterval = setInterval(updateCurrentPosition, stepValue);

    return () => clearInterval(updateInterval);
  }, [isPlaying, stepValue, updateCurrentPosition]);

  return {
    currentValue,
    totalValue,
    onValueChange,
    artworkColors: track?.artwork.colors
  };
};
