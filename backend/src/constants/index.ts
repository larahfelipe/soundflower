import type { TrackResponse } from '@/modules';

export const QUERY_SPLIT_IDENTIFIER = '-';

export const DEFAULT_TRACK_RESPONSE: TrackResponse = {
  title: '',
  artist: '',
  albumTitle: '',
  albumUrl: '',
  artworkUrl: '',
  artworkColors: {
    Vibrant: '',
    Muted: '',
    DarkVibrant: '',
    DarkMuted: '',
    LightVibrant: '',
    LightMuted: ''
  },
  ytVideoId: ''
};
