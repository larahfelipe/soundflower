import { useState } from 'react';

import { useSoundPlayer } from '../useSoundPlayer';

export const usePlayer = () => {
  const [enteredTrack, setEnteredTrack] = useState('');

  const {
    enqueue,
    toggleShuffle,
    previousTrack,
    togglePlayback,
    nextTrack,
    toggleRepeat,
    isAudioLoaded,
    isLooping,
    isShuffled,
    isPlaying
  } = useSoundPlayer();

  const handleEnqueueTrack = async () => await enqueue(enteredTrack);

  const handleToggleShuffleQueue = () => toggleShuffle();

  const handleChangeToPreviousTrack = async () => await previousTrack();

  const handleTogglePlayback = async () => await togglePlayback();

  const handleChangeToNextTrack = async () => await nextTrack();

  const handleToggleRepeat = () => toggleRepeat();

  return {
    setEnteredTrack,
    handleEnqueueTrack,
    handleToggleShuffleQueue,
    handleChangeToPreviousTrack,
    handleTogglePlayback,
    handleChangeToNextTrack,
    handleToggleRepeat,
    isAudioLoaded,
    isLooping,
    isShuffled,
    isPlaying
  };
};
