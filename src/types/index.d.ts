import { Dispatch, SetStateAction, ReactNode } from 'react';

import { Audio } from 'expo-av';

export type PlaybackContextProps = {
  isLoading: boolean;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playbackStatus: PlaybackStatus;
  setPlaybackStatus: Dispatch<SetStateAction<PlaybackStatus>>;
  soundPlayer: Audio.Sound;
  getTrack: (track: string) => Promise<void>;
  track: TrackData;
};

export type PlaybackProviderProps = {
  children: ReactNode;
};

export type ControlButtonProps = {
  icon: string;
  onPress: () => void;
};

export type IconProps = {
  size: number;
};

export type InputFieldProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

type AudioQuality =
  | 'AUDIO_QUALITY_LOW'
  | 'AUDIO_QUALITY_MEDIUM'
  | 'AUDIO_QUALITY_HIGH';

type TrackFormatsData = {
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
  LightVibrant?: string;
  LightMuted?: string;
  Fallback: string;
};

export type TrackData = {
  artistName: string;
  albumTitle: string;
  albumUrl: string;
  albumCoverUrl: string;
  coverColors: Palette;
  videoId: string;
  title: string;
  streamUrl?: string;
};
