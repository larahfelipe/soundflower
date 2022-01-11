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

export type ProgressSliderProps = {
  currentPosition: number;
  onPositionChange: (value: number) => void;
  totalDuration: number;
  stepInterval: number;
};

export type YtdlResponse = {
  formats: Track[];
};

type AudioQuality =
  | 'AUDIO_QUALITY_LOW'
  | 'AUDIO_QUALITY_MEDIUM'
  | 'AUDIO_QUALITY_HIGH';

export type Track = {
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
