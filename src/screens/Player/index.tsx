import React, { useState, useMemo, useEffect } from 'react';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import { DefaultTheme, ThemeProvider, useTheme } from 'styled-components';

import {
  Loading,
  PlayerInputField,
  PlayerProgressSlider,
  PlayerControlButton
} from '@/components';
import { usePlayback } from '@/hooks';
import { PlaybackStatus } from '@/types';
import { Icons } from '@/utils';

import * as S from './styles';

export function Player() {
  const [enteredTrack, setEnteredTrack] = useState('');

  const {
    isLoading,
    isPlaying,
    setIsPlaying,
    setPlaybackStatus,
    soundPlayer,
    getTrack,
    track
  } = usePlayback();

  const { fonts, colors } = useTheme();

  const theme: DefaultTheme = useMemo(
    () => ({
      fonts: { ...fonts },
      colors: {
        ...colors,
        background: track.coverColors.DarkMuted || colors.background,
        backgroundLight: track.coverColors.Muted || colors.backgroundLight
      }
    }),
    [track.coverColors]
  );

  const handleTogglePlayback = async () => {
    if (Object.keys(soundPlayer).length === 0) return;

    const getPlaybackStatus = await soundPlayer.getStatusAsync();
    setPlaybackStatus(getPlaybackStatus as PlaybackStatus);
    isPlaying ? await soundPlayer.pauseAsync() : await soundPlayer.playAsync();
    setIsPlaying(!isPlaying);
  };

  const handleSearchTrack = async () => {
    if (!enteredTrack) return;

    isPlaying && (await soundPlayer.pauseAsync());
    await getTrack(enteredTrack);
    setEnteredTrack('');
  };

  useEffect(() => {
    getTrack(enteredTrack);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={theme}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <S.Wrapper>
              <S.AppNameWrapper>
                <S.AppName>soundflower</S.AppName>
              </S.AppNameWrapper>

              <S.InputWrapper>
                <PlayerInputField
                  value={enteredTrack}
                  setValue={setEnteredTrack}
                  placeholder="Enter a song and artist name"
                />
                <S.SearchButton onPress={handleSearchTrack}>
                  <S.Icon name={Icons.search} />
                </S.SearchButton>
              </S.InputWrapper>

              <S.TrackWrapper>
                <S.Header>
                  <S.AlbumTitle>{track.albumTitle}</S.AlbumTitle>
                </S.Header>

                <S.TrackInfoWrapper>
                  <S.TrackImage
                    source={{
                      uri: track.albumCoverUrl
                    }}
                  />
                  <S.TrackTitle>{track.title}</S.TrackTitle>
                  <S.ArtistName>{track.artistName}</S.ArtistName>
                </S.TrackInfoWrapper>

                <PlayerProgressSlider />

                <S.PlayerControlsWrapper>
                  <PlayerControlButton
                    icon={Icons.shuffle}
                    onPress={() => ''}
                  />
                  <PlayerControlButton
                    icon={Icons.previous}
                    onPress={() => ''}
                  />
                  <PlayerControlButton
                    icon={isPlaying ? Icons.pause : Icons.play}
                    onPress={handleTogglePlayback}
                  />
                  <PlayerControlButton icon={Icons.next} onPress={() => ''} />
                  <PlayerControlButton icon={Icons.repeat} onPress={() => ''} />
                </S.PlayerControlsWrapper>
              </S.TrackWrapper>
            </S.Wrapper>
          </TouchableWithoutFeedback>
        </ThemeProvider>
      )}
    </>
  );
}
