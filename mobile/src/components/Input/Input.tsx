import React from 'react';

import { useTheme } from 'styled-components';

import * as S from './styles';
import type { InputProps } from './types';

export const Input = ({ rightContent, ...props }: InputProps) => {
  const { colors } = useTheme();

  return (
    <S.Wrapper>
      <S.Input
        placeholderTextColor={colors.titleDark}
        rightContent={rightContent}
        {...props}
      />

      {!!rightContent && (
        <S.RightContentWrapper>{rightContent}</S.RightContentWrapper>
      )}
    </S.Wrapper>
  );
};
