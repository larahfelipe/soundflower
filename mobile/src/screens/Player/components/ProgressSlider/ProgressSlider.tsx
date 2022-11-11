import React from 'react';

import Slider from '@react-native-community/slider';
import { useTheme } from 'styled-components';

import { formatTime } from '@/utils';

import { useProgress } from './hooks';
import * as S from './styles';

export const ProgressSlider = () => {
  const { onValueChange, currentValue, totalValue, artworkColors } =
    useProgress();

  const { colors } = useTheme();

  return (
    <S.Wrapper>
      <Slider
        value={currentValue}
        onSlidingComplete={onValueChange}
        maximumValue={totalValue}
        minimumTrackTintColor={colors.titleDark}
        maximumTrackTintColor={artworkColors.Muted ?? colors.shapeDark}
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
