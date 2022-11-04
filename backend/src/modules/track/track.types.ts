import type { VideoMetadataResult, VideoSearchResult } from 'yt-search';

export type VideoMetadata = VideoMetadataResult | VideoSearchResult;

export type GetTrackByTitleRequest = {
  title: string;
};

export type GetTrackByMetadataRequest = GetTrackByTitleRequest & {
  artist: string;
};

export type Image = {
  '#text': string;
  size: string;
};

type Album = {
  artist: string;
  title: string;
  url: string;
  image: Image[];
};

export type TrackData = {
  track: {
    name: string;
    album: Album;
  };
};

type SearchedTrack = {
  name: string;
  artist: string;
  image: Image[];
};

export type SearchTrack = {
  results: {
    trackmatches: {
      track: SearchedTrack[];
    };
  };
};
