import React from 'react';

import { MarqueeTxt, ScaleEntry } from '@/components';
import { DEFAULT_TRACK_DATA } from '@/constants';

import * as S from './styles';
import type { TrackInfoProps } from './types';

export const TrackInfo = ({ track, loading }: TrackInfoProps) => {
  return (
    <ScaleEntry fromScale={1} toScale={loading ? 0.85 : 1} duration={200}>
      <S.Wrapper>
        <S.TrackCover
          source={{ uri: track.artwork.url ?? DEFAULT_TRACK_DATA.artwork.url }}
        />

        <S.TrackMetadataWrapper>
          <MarqueeTxt size={18} weight="bold">
            {track.title}
          </MarqueeTxt>
          <S.ArtistName>{track.artist}</S.ArtistName>
        </S.TrackMetadataWrapper>
      </S.Wrapper>
    </ScaleEntry>
  );
};
