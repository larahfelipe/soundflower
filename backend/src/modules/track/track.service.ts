/* eslint-disable @typescript-eslint/no-empty-function */
import type { AxiosResponse } from 'axios';

import { api } from '@/services';

import type {
  GetTrackByMetadataRequest,
  GetTrackByTitleRequest,
  SearchTrack,
  TrackData
} from './track.types';

export class TrackService {
  private static INSTANCE: TrackService;

  private constructor() {}

  static getInstance() {
    if (!TrackService.INSTANCE) TrackService.INSTANCE = new TrackService();

    return TrackService.INSTANCE;
  }

  async getTrackByMetadata({ title, artist }: GetTrackByMetadataRequest) {
    const { data }: AxiosResponse<TrackData> = await api.get(
      `/?method=track.getinfo&track=${title}&artist=${artist}`
    );

    return data;
  }

  async getTrackByTitle({ title }: GetTrackByTitleRequest) {
    const { data }: AxiosResponse<SearchTrack> = await api.get(
      `/?method=track.search&track=${title}`
    );

    return data;
  }
}
