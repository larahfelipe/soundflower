import { Dispatch, SetStateAction } from 'react';

export type PlayerWrapperProps = {
  trackImgUrl: string;
};

import { Audio } from 'expo-av';

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

type Item = {
  id: {
    videoId: string;
  };
};

export type YouTubeData = {
  items: Item[];
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

type Album = {
  '#text': string;
  size: string;
};

export type TrackInfo = {
  artistName: string;
  albumTitle: string;
  albumCover: Album[] | any;
  albumUrl: string;
  songTitle: string;
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
