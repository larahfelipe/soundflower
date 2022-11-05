import React, { useCallback, useEffect, useState } from 'react';

import Slider from '@react-native-community/slider';
import { useTheme } from 'styled-components';

import { useApp } from '@/hooks';
import { formatTime } from '@/utils';

import { useSoundPlayer } from '../../hooks';
import * as S from './styles';

export const ProgressSlider = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [stepValue, setStepValue] = useState(0);

  const { platform } = useApp();
  const {
    getSoundPlayerStatus,
    getPlaybackPosition,
    setPlaybackPosition,
    togglePlayback,
    isPlaying
  } = useSoundPlayer();

  const { colors } = useTheme();

  const handleValueChange = async (value: number) =>
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
      setCurrentValue(0);
      await togglePlayback();
      await setPlaybackPosition(0);
      return;
    }

    setCurrentValue(positionMillis);
  }, [getPlaybackPosition, totalValue, togglePlayback]);

  useEffect(() => void onMount(), [onMount]);

  useEffect(() => {
    if (!isPlaying) return;

    const updateInterval = setInterval(updateCurrentPosition, stepValue);

    return () => clearInterval(updateInterval);
  }, [isPlaying, stepValue, updateCurrentPosition]);

  return (
    <S.Wrapper>
      <Slider
        value={currentValue}
        onSlidingComplete={handleValueChange}
        maximumValue={totalValue}
        minimumTrackTintColor={colors.titleDark}
        maximumTrackTintColor={colors.shapeDark}
        thumbTintColor={colors.shape}
        style={{ width: '95%' }}
      />

      <S.TimestampsWrapper>
        <S.Time>{formatTime(currentValue)}</S.Time>
        <S.Time>{formatTime(totalValue)}</S.Time>
      </S.TimestampsWrapper>
    </S.Wrapper>
  );
};
