import React from 'react';

import { ControlButtonProps } from '@/types';
import { Icons } from '@/utils';

import * as S from './styles';

export function PlayerControlButton({
  icon,
  onPress,
  ...rest
}: ControlButtonProps) {
  const parsedIconSize = icon === Icons.play || icon === Icons.pause ? 64 : 22;

  return (
    <S.Wrapper onPress={onPress} {...rest}>
      <S.Icon name={icon} size={parsedIconSize} />
    </S.Wrapper>
  );
}
