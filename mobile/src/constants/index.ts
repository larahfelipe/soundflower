import type { Track } from '@/types';

export const AUDIO_QUALITY = {
  HIGH: 'AUDIO_QUALITY_HIGH',
  MEDIUM: 'AUDIO_QUALITY_MEDIUM',
  LOW: 'AUDIO_QUALITY_LOW'
};

export const ICONS = {
  SEARCH: 'search-outline',
  PLAY: 'ios-play-circle-sharp',
  PAUSE: 'ios-pause-circle-sharp',
  PREVIOUS: 'ios-play-skip-back-sharp',
  NEXT: 'ios-play-skip-forward-sharp',
  REPEAT: 'ios-repeat-sharp',
  SHUFFLE: 'ios-shuffle-sharp'
};

export const DEFAULT_TRACK_DATA: Track = {
  title: '',
  artistName: '',
  streamUrl: '',
  albumTitle: '',
  albumUrl: '',
  coverColors: {
    Fallback: '#000'
  },
  videoId: '',
  albumCoverUrl:
    'https://github.com/larafe1/soundflower/blob/master/src/assets/placeholder.png?raw=true'
};
