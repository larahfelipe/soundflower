import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { IconProps } from '@/types';

export const Wrapper = styled.TouchableOpacity``;

export const Icon = styled(Ionicons)<IconProps>`
  font-size: ${({ size }) => RFValue(size)}px;

  color: ${({ theme }) => theme.colors.title};
`;
