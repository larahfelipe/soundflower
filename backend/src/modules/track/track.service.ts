import type { AxiosResponse } from 'axios';
import yts from 'yt-search';

import { api, envs, redis } from '@/config';
import { DEFAULT_TRACK_RESPONSE } from '@/constants';
import {
  getArtworkColorsPalette,
  getHQArtworkUrl,
  getQueryPayloadPossibilities,
  getYouTubeVideoId,
  isValidYouTubeURL,
  parseTrackMetadata
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
    let response: TrackService.Result = DEFAULT_TRACK_RESPONSE;
    let videoMetadata = {} as VideoMetadata;

    const maybeResponse = await redis.getData(`${envs.redisTrackKey}:${q}`);
    if (maybeResponse) {
      response = JSON.parse(maybeResponse);

      return response;
    }

    if (isValidYouTubeURL(q)) {
      const videoId = getYouTubeVideoId(q);
      if (!videoId) throw new Error('Invalid YouTube Video ID');

      videoMetadata = await yts({ videoId });
    } else {
      const { videos } = await yts(q);
      if (!videos.length)
        throw new Error('No videos found with the given query');

      videoMetadata = videos[0];
    }

    response = {
      ...response,
      id: videoMetadata.videoId,
      artwork: {
        ...response.artwork,
        url: videoMetadata.thumbnail
      },
      title: videoMetadata.title
    };

    for (const v of getQueryPayloadPossibilities(q)) {
      const { artist, title } = parseTrackMetadata(v);
      if (!artist.length) break;

      const { track: trackData_1 } = await this.getTrackByMetadata({
        artist,
        title
      });

      if (!trackData_1) continue;

      if (trackData_1?.album) {
        response = {
          ...response,
          artwork: {
            ...response.artwork,
            url: getHQArtworkUrl(
              trackData_1.album.image,
              videoMetadata.thumbnail
            )
          },
          album: {
            title: trackData_1.album.title
          },
          title: trackData_1.name,
          artist: trackData_1.album.artist
        };

        break;
      }

      const { results: trackResults } = await this.getTrackByTitle({ title });

      const maybeDesiredTrack = trackResults.trackmatches.track.find(
        (t) => t.artist.toUpperCase() === artist.toUpperCase()
      );

      if (maybeDesiredTrack) {
        const { name: title, artist, image } = maybeDesiredTrack;

        const { track: trackData_2 } = await this.getTrackByMetadata({
          artist,
          title
        });

        const artworkUrl =
          !image.length && trackData_2.album.image.length
            ? getHQArtworkUrl(trackData_2.album.image, videoMetadata.thumbnail)
            : getHQArtworkUrl(image, videoMetadata.thumbnail);

        response = {
          ...response,
          artwork: {
            ...response.artwork,
            url: artworkUrl
          },
          album: {
            title: trackData_2.album.title
          },
          title,
          artist
        };

        break;
      }
    }

    response = {
      ...response,
      artwork: {
        ...response.artwork,
        colors: await getArtworkColorsPalette(response.artwork.url)
      }
    };

    await redis.setData(`${envs.redisTrackKey}:${q}`, response);

    return response;
  }
}

export namespace TrackService {
  export type Params = TrackRequest;
  export type Result = TrackResponse;
}
