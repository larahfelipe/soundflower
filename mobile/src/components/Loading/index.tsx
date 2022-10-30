import React from 'react';

import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import * as S from './styles';
import type { LoadingProps } from './types';

export function Loading({ text }: LoadingProps) {
  const { colors } = useTheme();

  return (
    <S.Wrapper>
      <ActivityIndicator size="large" color={colors.shape} />
      {!!text && <S.LoadingText>{text}</S.LoadingText>}
      <S.AppName>soundflower</S.AppName>
    </S.Wrapper>
  );
}
