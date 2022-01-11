import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;

  align-items: center;

  margin-top: 64px;
`;

export const AlbumName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.title};
`;

export const TrackInfoWrapper = styled.View`
  align-items: center;
`;

export const Image = styled.Image`
  width: 300px;
  height: 300px;

  border-radius: 10px;
`;

export const TrackName = styled.Text`
  margin-top: ${RFValue(12)}px;

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.title};
`;

export const ArtistName = styled.Text`
  margin-top: ${RFValue(6)}px;

  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.titleDark};
`;

export const PlayerControlsWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  margin-bottom: 32px;
`;
