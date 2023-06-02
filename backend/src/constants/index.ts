import type { GetTrackResponse } from '@/modules';

export const QUERY_SPLIT_IDENTIFIER = '-';

export const DEFAULT_TRACK_RESPONSE: GetTrackResponse = {
  id: '',
  title: '',
  artist: '',
  album: {
    title: ''
  },
  artwork: {
    url: '',
    colors: {
      Vibrant: '',
      Muted: '',
      DarkVibrant: '',
      DarkMuted: ''
    }
  }
};
