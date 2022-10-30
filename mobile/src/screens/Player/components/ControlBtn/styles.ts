import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import type { IconProps } from './types';

export const ControlBtn = styled.TouchableOpacity``;

export const Icon = styled(Ionicons)<IconProps>`
  font-size: ${({ size }) => RFValue(size)}px;

  color: ${({ theme }) => theme.colors.title};
`;
