import React, { useState, useCallback, useEffect } from 'react';

import Slider from '@react-native-community/slider';
import { useTheme } from 'styled-components';

import { ProgressSliderProps, PlaybackStatus } from '@/types';
import { formatTime } from '@/utils';

import * as S from './styles';

export function PlayerProgressSlider({
  isPlaying,
  setIsPlaying,
  stepInterval,
  soundPlayerState,
  onPositionChange
}: ProgressSliderProps) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const { colors } = useTheme();

  const getCurrentPosition = useCallback(async () => {
    if (Object.keys(soundPlayerState).length) {
      const { positionMillis, durationMillis } =
        (await soundPlayerState.getStatusAsync()) as PlaybackStatus;

      if (isPlaying) {
        if (positionMillis === durationMillis) {
          setCurrentPosition(0);
          setIsPlaying(false);
        } else {
          setCurrentPosition(positionMillis);
          setTotalDuration(durationMillis);
        }
      }
    }
  }, [soundPlayerState, isPlaying]);

  useEffect(() => {
    const updatePositionInterval = setInterval(
      getCurrentPosition,
      stepInterval
    );
    return () => clearInterval(updatePositionInterval);
  }, [getCurrentPosition, stepInterval]);

  return (
    <S.Wrapper>
      <Slider
        value={currentPosition}
        onValueChange={onPositionChange}
        step={stepInterval}
        minimumValue={0}
        maximumValue={totalDuration}
        style={{ width: '90%' }}
        minimumTrackTintColor={colors.titleDark}
        maximumTrackTintColor={colors.shape}
        thumbTintColor={colors.shape}
      />
      <S.LabelsWrapper>
        <S.CurrentPosition>{formatTime(currentPosition)}</S.CurrentPosition>
        <S.TotalDuration>{formatTime(totalDuration)}</S.TotalDuration>
      </S.LabelsWrapper>
    </S.Wrapper>
  );
}
