import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  height: ${RFPercentage(60)}px;

  align-items: center;

  padding-top: ${RFValue(20)}px;
`;

export const TrackCover = styled.Image`
  width: ${RFValue(260)}px;
  height: ${RFValue(260)}px;

  border-radius: ${RFValue(5)}px;
`;

export const TrackTitle = styled.Text`
  margin-top: ${RFValue(20)}px;

  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.title};
`;

export const ArtistName = styled.Text`
  margin-top: ${RFValue(7)}px;

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.titleDark};
`;
