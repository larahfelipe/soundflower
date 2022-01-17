import { Dispatch, SetStateAction } from 'react';

import { Audio } from 'expo-av';

export type PlayerWrapperProps = {
  trackImgUrl: string;
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

export type ProgressSliderProps = {
  isPlaying: boolean;
  stepInterval: number;
  soundPlayerState: Audio.Sound;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  onPositionChange: (value: number) => void;
};

export type YtdlData = {
  formats: TrackData[];
};

type AudioQuality =
  | 'AUDIO_QUALITY_LOW'
  | 'AUDIO_QUALITY_MEDIUM'
  | 'AUDIO_QUALITY_HIGH';

export type TrackData = {
  approxDurationMs: number;
  audioQuality: AudioQuality;
  quality: string;
  qualityLabel: string;
  hasAudio: boolean;
  hasVideo: boolean;
  url: string;
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

export type TrackInfo = {
  artistName: string;
  albumTitle: string;
  albumUrl: string;
  albumCoverUrl: string;
  coverColors: Palette;
  videoId: string;
  title: string;
  streamUrl?: string;
};
