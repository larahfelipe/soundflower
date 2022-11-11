import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
`;

export const LoadingText = styled.Text`
  margin-top: ${RFValue(16)}px;

  text-align: center;

  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.shape};
`;

export const AppName = styled.Text`
  margin-top: ${RFValue(36)}px;

  padding-bottom: ${RFValue(36)}px;

  text-align: center;

  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.shape};
`;
