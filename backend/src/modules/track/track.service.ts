import type { AxiosResponse } from 'axios';
import yts from 'yt-search';

import { api } from '@/config';
import { DEFAULT_TRACK_RESPONSE } from '@/constants';
import {
  getArtworkPaletteColors,
  getHQArtworkUrl,
  getYouTubeVideoId,
  parseTrackMetadata,
  validateYouTubeUrl
} from '@/utils';

import type { TrackRequest, TrackResponse } from './track.schema';
import type {
  GetTrackByMetadataRequest,
  GetTrackByTitleRequest,
  SearchTrack,
  TrackData,
  VideoMetadata
} from './track.types';

export class TrackService {
  protected async getTrackByMetadata({
    title,
    artist
  }: GetTrackByMetadataRequest) {
    const { data }: AxiosResponse<TrackData> = await api.get(
      `/?method=track.getinfo&track=${title}&artist=${artist}`
    );
    return data;
  }

  protected async getTrackByTitle({ title }: GetTrackByTitleRequest) {
    const { data }: AxiosResponse<SearchTrack> = await api.get(
      `/?method=track.search&track=${title}`
    );
    return data;
  }

  async execute({ q }: TrackService.Params) {
    const trackResponse: TrackService.Result = DEFAULT_TRACK_RESPONSE;
    let videoMetadata = {} as VideoMetadata;
    const isValidYouTubeUrl = validateYouTubeUrl(q);

    try {
      if (isValidYouTubeUrl) {
        const videoId = getYouTubeVideoId(q);
        if (!videoId) throw new Error('Invalid YouTube Video ID');

        videoMetadata = await yts({ videoId });
      } else {
        const { videos } = await yts(q);
        if (!videos.length)
          throw new Error('No videos found with the given query');

        videoMetadata = videos[0];
      }

      Object.assign(trackResponse, {
        title: videoMetadata.title,
        artworkUrl: videoMetadata.thumbnail,
        ytVideoId: videoMetadata.videoId
      });

      const trackMetadata = parseTrackMetadata(q);
      if (trackMetadata?.artist) {
        const { artist, title } = trackMetadata;

        const trackByMetadata_1 = await this.getTrackByMetadata({
          artist,
          title
        });

        if (trackByMetadata_1?.track?.album) {
          Object.assign(trackResponse, {
            albumTitle: trackByMetadata_1.track.album.title,
            albumUrl: trackByMetadata_1.track.album.url,
            title: trackByMetadata_1.track.name,
            artist: trackByMetadata_1.track.album.artist,
            artworkUrl: getHQArtworkUrl(trackByMetadata_1.track.album.image)
          });
        } else {
          const trackByTitle = await this.getTrackByTitle({ title });

          const targetTrack = trackByTitle.results.trackmatches.track.find(
            (track) => track.artist.toUpperCase() === artist.toUpperCase()
          );

          if (targetTrack) {
            let artworkUrl = '';
            const { name, artist } = targetTrack;

            const trackByMetadata_2 = await this.getTrackByMetadata({
              artist,
              title: name
            });

            artworkUrl =
              !targetTrack.image.length &&
              trackByMetadata_2.track.album.image.length
                ? getHQArtworkUrl(trackByMetadata_2.track.album.image)
                : getHQArtworkUrl(targetTrack.image);

            Object.assign(trackResponse, {
              albumTitle: trackByMetadata_2.track.album.title,
              albumUrl: trackByMetadata_2.track.album.url,
              title: name,
              artist,
              artworkUrl
            });
          }
        }
      }

      Object.assign(trackResponse, {
        artworkColors:
          (await getArtworkPaletteColors(trackResponse.artworkUrl)) ??
          trackResponse.artworkColors
      });

      return trackResponse;
    } catch (e) {
      console.error(e);
    }
  }
}

export namespace TrackService {
  export type Params = TrackRequest;
  export type Result = TrackResponse;
}
