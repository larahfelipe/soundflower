import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const AppName = styled.Text`
  margin-bottom: 22px;

  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.shape};
`;
