import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import type { IconProps } from './types';

export const ControlBtn = styled.TouchableOpacity``;

export const Icon = styled(Ionicons)<IconProps>`
  font-size: ${({ size }) => RFValue(size)}px;

  position: relative;

  color: ${({ active, theme }) =>
    active ? theme.colors.success : theme.colors.title};
`;

export const ActiveIcon = styled.View`
  width: 5px;
  height: 5px;

  align-self: center;
  margin-top: ${RFValue(30)}px;

  position: absolute;

  border-radius: ${RFValue(50)}px;

  background-color: ${({ theme }) => theme.colors.success};
`;
