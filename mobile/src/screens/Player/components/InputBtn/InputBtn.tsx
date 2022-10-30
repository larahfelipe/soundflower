import React from 'react';

import { ICONS } from '@/constants';

import * as S from './styles';
import type { InputBtnProps } from './types';

export const InputBtn = (props: InputBtnProps) => {
  return (
    <S.InputBtn {...props}>
      <S.Icon name={ICONS.SEARCH} />
    </S.InputBtn>
  );
};
