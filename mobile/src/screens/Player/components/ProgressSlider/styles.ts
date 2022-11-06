import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;

  align-items: center;
  justify-content: space-evenly;
`;

export const TimestampsWrapper = styled.View`
  width: 95%;
  height: ${RFValue(20)}px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Time = styled.Text`
  font-size: ${RFValue(11.5)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.titleDark};
`;
