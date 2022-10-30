import React from 'react';

import * as S from './styles';
import type { TrackInfoProps } from './types';

export const TrackInfo = ({ track }: TrackInfoProps) => {
  return (
    <S.Wrapper>
      <S.TrackCover source={{ uri: track.albumCoverUrl }} />
      <S.TrackTitle>{track.title}</S.TrackTitle>
      <S.ArtistName>{track.artistName}</S.ArtistName>
    </S.Wrapper>
  );
};
