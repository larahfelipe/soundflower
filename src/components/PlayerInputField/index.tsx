import React from 'react';

import { useTheme } from 'styled-components';

import { InputFieldProps } from '@/types';

import * as S from './styles';

export function PlayerInputField({
  value,
  setValue,
  placeholder
}: InputFieldProps) {
  const { colors } = useTheme();

  return (
    <S.Wrapper>
      <S.InputField
        defaultValue={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={colors.titleDark}
        autoCapitalize="words"
      />
    </S.Wrapper>
  );
}
