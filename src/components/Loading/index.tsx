import React from 'react';

import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import * as S from './styles';

export function Loading() {
  const { colors } = useTheme();

  return (
    <S.Wrapper>
      <ActivityIndicator size="large" color={colors.shape} />
    </S.Wrapper>
  );
}
