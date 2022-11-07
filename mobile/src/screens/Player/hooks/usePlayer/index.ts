import { useState } from 'react';

import { useSoundPlayer } from '../useSoundPlayer';

export const usePlayer = () => {
  const [enteredTrack, setEnteredTrack] = useState('');

  const {
    enqueue,
    shuffleQueue,
    previousTrack,
    togglePlayback,
    nextTrack,
    toggleRepeat,
    isAudioLoaded,
    isPlaying
  } = useSoundPlayer();

  const handleEnqueueTrack = async () => await enqueue(enteredTrack);

  const handleShuffleQueue = () => shuffleQueue();

  const handleChangeToPreviousTrack = async () => await previousTrack();

  const handleTogglePlayback = async () => await togglePlayback();

  const handleChangeToNextTrack = async () => await nextTrack();

  const handleToggleRepeat = () => toggleRepeat();

  return {
    setEnteredTrack,
    handleEnqueueTrack,
    handleShuffleQueue,
    handleChangeToPreviousTrack,
    handleTogglePlayback,
    handleChangeToNextTrack,
    handleToggleRepeat,
    isAudioLoaded,
    isPlaying
  };
};
