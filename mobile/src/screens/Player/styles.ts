import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(15)}px;

  padding: 0 ${RFValue(14)}px;

  margin-top: ${RFValue(52)}px;
`;

export const ErrorMessage = styled.Text`
  margin-top: ${RFValue(12)}px;
  margin-left: ${RFValue(14)}px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: red;
`;

export const Body = styled.View`
  width: 100%;
  height: ${RFPercentage(85)}px;

  padding: 0 ${RFValue(14)}px;

  justify-content: space-between;
`;

export const PlayerControlsWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  margin-bottom: ${RFValue(32)}px;
`;
