import React, { useState } from 'react';

import { PlayerControlButton } from '@/components';
import { Icons } from '@/utils';

import * as S from './styles';

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const imageUrl =
    'https://static.wikia.nocookie.net/arianagrande/images/e/ec/Sweetener_Artwork.jpg/revision/latest?cb=20180619023714';

  const handleTogglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.AlbumName>Sweetener</S.AlbumName>
      </S.Header>

      <S.TrackInfoWrapper>
        <S.Image
          source={{
            uri: imageUrl
          }}
        />
        <S.TrackName>no tears left to cry</S.TrackName>
        <S.ArtistName>Ariana Grande</S.ArtistName>
      </S.TrackInfoWrapper>

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
