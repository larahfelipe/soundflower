import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const InputBtn = styled.TouchableOpacity`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  border-top-right-radius: ${RFValue(50)}px;
  border-bottom-right-radius: ${RFValue(50)}px;

  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(22)}px;

  color: ${({ theme }) => theme.colors.shape};
`;
