import React from 'react';

import { DEFAULT_TRACK_DATA } from '@/constants';

import * as S from './styles';
import type { TrackInfoProps } from './types';

export const TrackInfo = ({ track }: TrackInfoProps) => {
  return (
    <S.Wrapper>
      <S.TrackCover
        source={{ uri: track.artworkUrl ?? DEFAULT_TRACK_DATA.artworkUrl }}
      />
      <S.TrackTitle>{track.title}</S.TrackTitle>
      <S.ArtistName>{track.artist}</S.ArtistName>
    </S.Wrapper>
  );
};
