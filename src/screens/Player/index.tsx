import React, { useState, useEffect } from 'react';

import { Audio } from 'expo-av';
import ytdl from 'react-native-ytdl';

import { PlayerProgressSlider, PlayerControlButton } from '@/components';
import { Track, PlaybackStatus, YtdlResponse } from '@/types';
import { Icons } from '@/utils';

import * as S from './styles';

const musicUrl = 'https://www.youtube.com/watch?v=d22TMCdq30Y';

const imageUrl =
  'https://static.wikia.nocookie.net/arianagrande/images/e/ec/Sweetener_Artwork.jpg/revision/latest?cb=20180619023714';

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState({} as Audio.Sound);
  const [playbackStatus, setPlaybackStatus] = useState({} as PlaybackStatus);
  const [track, setTrack] = useState({} as Track);

  const handleTogglePlayback = async () => {
    if (Object.keys(player).length === 0) {
      const { sound: newPlayer } = await Audio.Sound.createAsync({
        uri: track.url
      });
      setPlayer(newPlayer);
      await newPlayer.playAsync();
    } else {
      const getPlaybackStatus = await player.getStatusAsync();
      setPlaybackStatus(getPlaybackStatus as PlaybackStatus);
      isPlaying ? await player.pauseAsync() : await player.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const getTrack = async () => {
    const { formats }: YtdlResponse = await ytdl.getInfo(musicUrl);
    const bestTrackFormats = formats.filter(
      (track) => track.hasAudio && track.audioQuality !== 'AUDIO_QUALITY_LOW'
    );
    setTrack(bestTrackFormats[0]);
  };

  useEffect(() => {
    getTrack();
  }, []);

  return (
    <S.Wrapper>
      <S.Header>
        <S.AlbumName>Sweetener</S.AlbumName>
      </S.Header>

      <S.TrackInfoWrapper>
        <S.TrackImage
          source={{
            uri: imageUrl
          }}
        />
        <S.TrackName>no tears left to cry</S.TrackName>
        <S.ArtistName>Ariana Grande</S.ArtistName>
      </S.TrackInfoWrapper>

      <PlayerProgressSlider
        currentPosition={playbackStatus.positionMillis}
        onPositionChange={async (value) => await player.setPositionAsync(value)}
        totalDuration={playbackStatus.durationMillis}
        stepInterval={playbackStatus.progressUpdateIntervalMillis}
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
    </S.Wrapper>
  );
}
