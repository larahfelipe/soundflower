import React from 'react';

import { ICONS } from '@/constants';

import * as S from './styles';
import type { ControlBtnProps } from './types';

export const ControlBtn = ({ icon, ...props }: ControlBtnProps) => {
  const iconSize = icon === ICONS.PLAY || icon === ICONS.PAUSE ? 70 : 22;

  return (
    <S.ControlBtn {...props}>
      <S.Icon name={icon} size={iconSize} />
    </S.ControlBtn>
  );
};
