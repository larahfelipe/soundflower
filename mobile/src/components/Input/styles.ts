import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import type { InputProps } from './types';

export const Wrapper = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput<InputProps>`
  width: 100%;

  padding: ${RFValue(11)}px ${RFValue(16)}px;

  position: relative;

  font-size: ${RFValue(16)}px;

  border-radius: ${RFValue(50)}px;

  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

export const RightContentWrapper = styled.View`
  width: 15%;
  height: 100%;

  position: absolute;
  right: 0;
`;
