import React from 'react';

import Slider from '@react-native-community/slider';

import { ProgressSliderProps } from '@/types';

export function PlayerProgressSlider({
  currentPosition,
  onPositionChange,
  totalDuration,
  stepInterval
}: ProgressSliderProps) {
  return (
    <Slider
      value={currentPosition}
      onValueChange={onPositionChange}
      minimumValue={0}
      maximumValue={totalDuration}
      step={stepInterval}
      style={{ width: '90%' }}
      minimumTrackTintColor="#ccc"
      maximumTrackTintColor="#fff"
      thumbTintColor="#fff"
    />
  );
}
