import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  height: 40px;

  align-items: center;
`;

export const LabelsWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  padding: 10px 20px;
`;

export const CurrentPosition = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.titleDark};
`;

export const TotalDuration = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.titleDark};
`;
