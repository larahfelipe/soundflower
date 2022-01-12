import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const InputWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 62px;
`;

export const SearchButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(22)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const TrackWrapper = styled.View`
  flex: 1;

  justify-content: space-between;
  align-items: center;

  margin-top: 42px;
`;

export const Header = styled.View`
  width: 100%;

  align-items: center;
`;

export const AlbumTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.title};
`;

export const TrackInfoWrapper = styled.View`
  align-items: center;
`;

export const TrackImage = styled.Image`
  width: 300px;
  height: 300px;

  border-radius: 10px;
`;

export const TrackTitle = styled.Text`
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
