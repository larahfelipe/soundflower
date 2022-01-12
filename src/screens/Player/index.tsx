import React, { useState, useEffect } from 'react';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import axios, { AxiosResponse } from 'axios';
import { Audio } from 'expo-av';
import ytdl from 'react-native-ytdl';

import {
  Loading,
  PlayerInputField,
  PlayerProgressSlider,
  PlayerControlButton
} from '@/components';
import config from '@/config';
import {
  TrackInfo,
  PlaybackStatus,
  YouTubeData,
  YtdlData,
  TrackData
} from '@/types';
import { Icons } from '@/utils';

import * as S from './styles';

const defaultPlaceholder = 'Enter a song and artist name';

const defaultTrackInfo: TrackInfo = {
  songTitle: '',
  artistName: '',
  albumUrl: '',
  albumTitle: '',
  albumCover: config.CoverPlaceholderUrl
};

export function Player() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState(defaultPlaceholder);
  const [trackInfo, setTrackInfo] = useState(defaultTrackInfo);
  const [track, setTrack] = useState('');
  const [soundPlayer, setSoundPlayer] = useState({} as Audio.Sound);
  const [playbackStatus, setPlaybackStatus] = useState({} as PlaybackStatus);

  const handleSearchTrack = async () => {
    if (!track) return;

    await getTrack();
    setInputPlaceholder('Now listening: ' + track);
    setTrack('');
  };

  const handleTogglePlayback = async () => {
    if (Object.keys(soundPlayer).length === 0) return;

    const getPlaybackStatus = await soundPlayer.getStatusAsync();
    setPlaybackStatus(getPlaybackStatus as PlaybackStatus);
    isPlaying ? await soundPlayer.pauseAsync() : await soundPlayer.playAsync();
    setIsPlaying(!isPlaying);
  };

  const parseTrack = async (trackId: string) => {
    const { formats }: YtdlData = await ytdl.getInfo(trackId);
    if (!formats)
      throw new Error('Could not find any formats for the requested track');

    const bestTrackFormats = formats.filter(
      (track) => track.hasAudio && track.audioQuality !== 'AUDIO_QUALITY_LOW'
    );
    return bestTrackFormats;
  };

  const getTrack = async () => {
    const [trackTitle, trackArtist] = track
      .split('-')
      .map((item) => item.trim());
    const optionalSearchParams = 'Audio HQ';
    const fmtSearch = encodeURI(
      `${trackArtist} - ${trackTitle} ${optionalSearchParams}`
    );

    try {
      if (!trackTitle || !trackArtist) return;
      setIsLoading(true);

      const { data: youtubeData }: AxiosResponse<YouTubeData> = await axios.get(
        `${config.YouTubeAPIUrl}/search?q=${fmtSearch}&key=${config.YouTubeAPIKey}`
      );
      if (!youtubeData) throw new Error('No results was found on youtube');
      const { id: bestSearchMatch } = youtubeData.items[0];
      // const bestSearchMatch = { videoId: '' };
      let parsedTrack: TrackData[] | undefined;

      if (Object.keys(soundPlayer).length === 0) {
        parsedTrack = await parseTrack(
          bestSearchMatch.videoId ||
            'https://www.youtube.com/watch?v=UMkCkPzbLYI'
        );
        if (!parsedTrack)
          throw new Error('Could not format the requested track');

        const soundPlayer = new Audio.Sound();
        await soundPlayer.loadAsync({
          uri: parsedTrack[0].url
        });
        setSoundPlayer(soundPlayer);
      } else {
        parsedTrack = await parseTrack(
          bestSearchMatch.videoId ||
            'https://www.youtube.com/watch?v=UMkCkPzbLYI'
        );
        if (!parsedTrack)
          throw new Error('Could not format the requested track');

        setIsPlaying(false);
        await soundPlayer.unloadAsync();
        await soundPlayer.loadAsync({
          uri: parsedTrack[0].url
        });
      }

      const { data: lastFmData }: AxiosResponse<TrackInfo> = await axios.get(
        `${config.LastFMProxyUrl}/track?name=${trackTitle}&artist=${trackArtist}`
      );
      setTrackInfo(lastFmData);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.Wrapper>
            <S.InputWrapper>
              <PlayerInputField
                value={track}
                setValue={setTrack}
                placeholder={inputPlaceholder}
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
                    uri:
                      trackInfo.albumCover[3]['#text'] ||
                      trackInfo.albumCover[2]['#text'] ||
                      trackInfo.albumCover
                  }}
                />
                <S.TrackTitle>{trackInfo.songTitle}</S.TrackTitle>
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
                <PlayerControlButton icon={Icons.shuffle} onPress={() => ''} />
                <PlayerControlButton icon={Icons.previous} onPress={() => ''} />
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
      )}
    </>
  );
}
