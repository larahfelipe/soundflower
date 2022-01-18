import React, { useState, useCallback, useEffect } from 'react';

import Slider from '@react-native-community/slider';
import { useTheme } from 'styled-components';

import { usePlayback } from '@/hooks';
import { PlaybackStatus } from '@/types';
import { formatTime } from '@/utils';

import * as S from './styles';

export function PlayerProgressSlider() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const { isPlaying, setIsPlaying, playbackStatus, soundPlayer } =
    usePlayback();

  const { colors } = useTheme();

  const getCurrentPosition = useCallback(async () => {
    if (Object.keys(soundPlayer).length) {
      const { positionMillis, durationMillis } =
        (await soundPlayer.getStatusAsync()) as PlaybackStatus;

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
  }, [soundPlayer, isPlaying]);

  useEffect(() => {
    const updatePositionInterval = setInterval(
      getCurrentPosition,
      playbackStatus.progressUpdateIntervalMillis
    );
    return () => clearInterval(updatePositionInterval);
  }, [getCurrentPosition, playbackStatus.progressUpdateIntervalMillis]);

  return (
    <S.Wrapper>
      <Slider
        value={currentPosition}
        onValueChange={async (value) =>
          await soundPlayer.setPositionAsync(value)
        }
        step={playbackStatus.progressUpdateIntervalMillis}
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
