import React, { useState, useMemo, useEffect } from 'react';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import { AxiosResponse } from 'axios';
import { Audio } from 'expo-av';
import ytdl from 'react-native-ytdl';
import { DefaultTheme, ThemeProvider, useTheme } from 'styled-components';

import {
  Loading,
  PlayerInputField,
  PlayerProgressSlider,
  PlayerControlButton
} from '@/components';
import config from '@/config';
import { api } from '@/services';
import { TrackInfo, YtdlData, PlaybackStatus } from '@/types';
import { Icons } from '@/utils';

import * as S from './styles';

const defaultTrackInfo: TrackInfo = {
  title: '',
  artistName: '',
  streamUrl: '',
  albumTitle: '',
  albumUrl: '',
  coverColors: {
    Fallback: '#000'
  },
  videoId: '',
  albumCoverUrl: config.CoverPlaceholderUrl
};

export function Player() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackInfo, setTrackInfo] = useState(defaultTrackInfo);
  const [track, setTrack] = useState('');
  const [soundPlayer, setSoundPlayer] = useState({} as Audio.Sound);
  const [playbackStatus, setPlaybackStatus] = useState({} as PlaybackStatus);

  const defaultTheme = useTheme();

  const theme: DefaultTheme = useMemo(
    () => ({
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        background:
          trackInfo.coverColors.DarkVibrant || defaultTheme.colors.background
      }
    }),
    [trackInfo.coverColors]
  );

  const handleTogglePlayback = async () => {
    if (Object.keys(soundPlayer).length === 0) return;

    const getPlaybackStatus = await soundPlayer.getStatusAsync();
    setPlaybackStatus(getPlaybackStatus as PlaybackStatus);
    isPlaying ? await soundPlayer.pauseAsync() : await soundPlayer.playAsync();
    setIsPlaying(!isPlaying);
  };

  const handleSearchTrack = async () => {
    if (!track) return;

    await getTrack();
    setTrack('');
  };

  const parseTrackFormats = async (trackId: string) => {
    const { formats }: YtdlData = await ytdl.getInfo(trackId);
    if (!formats)
      throw new Error('Could not find any formats for the requested track');

    let bestTrackFormatsAvailable = formats.filter(
      (track) => track.hasAudio && track.audioQuality !== 'AUDIO_QUALITY_LOW'
    );
    if (!bestTrackFormatsAvailable.length)
      bestTrackFormatsAvailable = formats.filter((track) => track.hasAudio);

    return bestTrackFormatsAvailable;
  };

  const getTrack = async () => {
    const [trackTitle, trackArtist] = track
      .split('-')
      .map((item) => item.trim());

    try {
      if (!trackTitle || !trackArtist) return;
      setIsLoading(true);

      const { data }: AxiosResponse<TrackInfo> = await api.get(
        `track?title=${trackTitle}&artist=${trackArtist}`
      );
      if (!data) throw new Error('No data was returned.');

      const trackFormats = await parseTrackFormats(data.videoId);

      if (!Object.keys(soundPlayer).length) {
        const soundPlayer = new Audio.Sound();
        await soundPlayer.loadAsync({
          uri: trackFormats[0].url
        });
        setSoundPlayer(soundPlayer);
      } else {
        setIsPlaying(false);
        await soundPlayer.unloadAsync();
        await soundPlayer.loadAsync({
          uri: trackFormats[0].url
        });
      }

      setTrackInfo({ ...trackInfo, ...data });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrack();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={theme}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <S.Wrapper mainColors={trackInfo.coverColors}>
              <S.AppNameWrapper>
                <S.AppName>soundflower</S.AppName>
              </S.AppNameWrapper>

              <S.InputWrapper>
                <PlayerInputField
                  value={track}
                  setValue={setTrack}
                  placeholder="Enter a song and artist name"
                />
                <S.SearchButton onPress={handleSearchTrack}>
                  <S.Icon name={Icons.search} />
                </S.SearchButton>
              </S.InputWrapper>

              <S.TrackWrapper>
                <S.Header>
                  <S.AlbumTitle>{trackInfo.albumTitle}</S.AlbumTitle>
                </S.Header>

                <S.TrackInfoWrapper>
                  <S.TrackImage
                    source={{
                      uri: trackInfo.albumCoverUrl
                    }}
                  />
                  <S.TrackTitle>{trackInfo.title}</S.TrackTitle>
                  <S.ArtistName>{trackInfo.artistName}</S.ArtistName>
                </S.TrackInfoWrapper>

                <PlayerProgressSlider
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  stepInterval={playbackStatus.progressUpdateIntervalMillis}
                  soundPlayerState={soundPlayer}
                  onPositionChange={async (value) =>
                    await soundPlayer.setPositionAsync(value)
                  }
                />

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
