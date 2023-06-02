import yts from 'yt-search';

import { envs, redis } from '@/config';
import { DEFAULT_TRACK_RESPONSE } from '@/constants';
import {
  getArtworkColorsPalette,
  getHQArtworkUrl,
  getQueryPayloadPossibilities,
  getYouTubeVideoId,
  isValidYouTubeURL,
  parseTrackMetadata
} from '@/utils';

import type { TrackService } from '../track.service';
import type { VideoMetadata } from '../track.types';
import type { GetTrackRequest, GetTrackResponse } from './get-track.schema';

export class GetTrackUseCase {
  private static INSTANCE: GetTrackUseCase;

  private constructor(private readonly trackService: TrackService) {}

  static getInstance(trackService: TrackService) {
    if (!GetTrackUseCase.INSTANCE)
      GetTrackUseCase.INSTANCE = new GetTrackUseCase(trackService);

    return GetTrackUseCase.INSTANCE;
  }

  async get({ q }: GetTrackUseCase.Params) {
    let res: GetTrackUseCase.Result = DEFAULT_TRACK_RESPONSE;
    let videoMetadata: VideoMetadata;

    const maybeCachedResult = await redis.getData(`${envs.redisTrackKey}:${q}`);
    if (maybeCachedResult) {
      res = await JSON.parse(maybeCachedResult);

      return res;
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

    res = {
      ...res,
      id: videoMetadata.videoId,
      artwork: {
        ...res.artwork,
        url: videoMetadata.thumbnail
      },
      title: videoMetadata.title
    };

    for (const v of getQueryPayloadPossibilities(q)) {
      const { artist, title } = parseTrackMetadata(v);
      if (!artist.length) break;

      const { track: trackData_1 } = await this.trackService.getTrackByMetadata(
        {
          artist,
          title
        }
      );

      if (!trackData_1) continue;

      if (trackData_1?.album) {
        res = {
          ...res,
          artwork: {
            ...res.artwork,
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

      const { results: trackResults } = await this.trackService.getTrackByTitle(
        { title }
      );

      const maybeDesiredTrack = trackResults.trackmatches.track.find(
        (t) => t.artist.toUpperCase() === artist.toUpperCase()
      );

      if (maybeDesiredTrack) {
        const { name: title, artist, image } = maybeDesiredTrack;

        const { track: trackData_2 } =
          await this.trackService.getTrackByMetadata({
            artist,
            title
          });

        const artworkUrl =
          !image.length && trackData_2.album.image.length
            ? getHQArtworkUrl(trackData_2.album.image, videoMetadata.thumbnail)
            : getHQArtworkUrl(image, videoMetadata.thumbnail);

        res = {
          ...res,
          artwork: {
            ...res.artwork,
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

    res = {
      ...res,
      artwork: {
        ...res.artwork,
        colors: await getArtworkColorsPalette(res.artwork.url)
      }
    };

    await redis.setData(`${envs.redisTrackKey}:${q}`, res);

    return res;
  }
}

export namespace GetTrackUseCase {
  export type Params = GetTrackRequest;
  export type Result = GetTrackResponse;
}
