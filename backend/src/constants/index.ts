import type { TrackResponse } from '@/modules';

export const QUERY_SPLIT_IDENTIFIER = '-';

export const DEFAULT_TRACK_RESPONSE: TrackResponse = {
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
