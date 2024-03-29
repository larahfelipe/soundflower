import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction
} from 'react';

import type { PlatformOSType } from 'react-native';

type ComponentProps = {
  children: ReactNode;
};

export type AppContextProps = {
  platform: MutableRefObject<PlatformOSType>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

export type AppProviderProps = ComponentProps;

export type ApiContextProps = {
  isLoading: boolean;
  getTrackInfoByMetadata: (trackId: string) => Promise<Track>;
};

export type ApiProviderProps = ComponentProps;

export type TrackContextProps = {
  track: Track;
  getTrack: (trackMetadata: string) => Promise<Track>;
  getTrackFormats: (trackId: string) => Promise<TrackFormats>;
  unloadTrack: () => void;
};

export type TrackProviderProps = ComponentProps;

export type PlaybackPosition = {
  positionMillis: number;
  durationMillis: number;
};

export type Queue = {
  index: number;
  default: string[];
  shuffled: string[];
};

export type SoundPlayerContextProps = {
  isPlaying: boolean;
  isAudioLoaded: boolean;
  isLooping: boolean;
  isShuffled: boolean;
  getSoundPlayerStatus: () => Promise<PlaybackStatus>;
  getPlaybackPosition: () => Promise<PlaybackPosition>;
  setPlaybackPosition: (positionMillis: number) => Promise<void>;
  togglePlayback: () => Promise<void>;
  onPlaybackFinish: () => Promise<void>;
  enqueue: (enteredValue: string) => Promise<void>;
  toggleShuffle: () => void;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  toggleRepeat: () => void;
};

export type SoundPlayerProviderProps = ComponentProps;

type Album = {
  title: string;
};

type Artwork = {
  url: string;
  colors: Palette;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: Album;
  artwork: Artwork;
};

type YtdlTrackFormatsData = {
  container: string;
  approxDurationMs: number;
  audioQuality: AudioQuality;
  quality: string;
  qualityLabel: string;
  hasAudio: boolean;
  hasVideo: boolean;
  url: string;
};

export type YtdlData = {
  formats: TrackFormatsData[];
};

export type TrackFormats = Record<
  'bestQuality' | 'worstQuality',
  YtdlTrackFormatsData[]
>;

export type PlaybackStatus = {
  isLoaded: true;
  androidImplementation?: string;
  uri: string;
  progressUpdateIntervalMillis: number;
  durationMillis: number;
  positionMillis: number;
  playableDurationMillis?: number;
  seekMillisToleranceBefore?: number;
  seekMillisToleranceAfter?: number;
  shouldPlay: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  rate: number;
  shouldCorrectPitch: boolean;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  didJustFinish: boolean;
};

type Palette = {
  Vibrant?: string;
  Muted?: string;
  DarkVibrant?: string;
  DarkMuted?: string;
  Fallback: string;
};
