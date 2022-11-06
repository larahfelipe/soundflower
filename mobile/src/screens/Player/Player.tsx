import React, { useState } from 'react';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { useTheme } from 'styled-components';

import { Gradient, Input, Loading } from '@/components';
import { ICONS } from '@/constants';
import { useApp, useTrack } from '@/hooks';

import { ControlBtn, InputBtn, ProgressSlider, TrackInfo } from './components';
import { useSoundPlayer } from './hooks';
import { SoundPlayerProvider } from './providers';
import * as S from './styles';

const PlayerComponent = () => {
  const [enteredTrack, setEnteredTrack] = useState('');

  const { error } = useApp();
  const { track } = useTrack();
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

  const { colors } = useTheme();

  const handleEnqueueTrack = async () => await enqueue(enteredTrack);

  const handleShuffleQueue = () => shuffleQueue();

  const handleChangeToPreviousTrack = async () => await previousTrack();

  const handleTogglePlayback = async () => await togglePlayback();

  const handleChangeToNextTrack = async () => await nextTrack();

  const handleToggleRepeat = () => toggleRepeat();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Wrapper>
        <S.Header>
          <Input
            placeholder="Search track"
            onChangeText={setEnteredTrack}
            onSubmitEditing={handleEnqueueTrack}
            rightContent={<InputBtn onPress={handleEnqueueTrack} />}
          />

          {!!error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.Header>

        <Gradient
          w="100%"
          h="95%"
          colors={[
            colors.background,
            track.artworkColors.DarkVibrant ?? colors.background,
            'transparent'
          ]}
        >
          <S.Body>
            <TrackInfo track={track} />

            {!!track.title && !isAudioLoaded ? (
              <Loading text="Preparing track. Please wait" />
            ) : (
              <>
                <ProgressSlider />

                <S.PlayerControlsWrapper>
                  <ControlBtn
                    icon={ICONS.SHUFFLE}
                    onPress={handleShuffleQueue}
                  />
                  <ControlBtn
                    icon={ICONS.PREVIOUS}
                    onPress={handleChangeToPreviousTrack}
                  />
                  <ControlBtn
                    icon={isPlaying ? ICONS.PAUSE : ICONS.PLAY}
                    onPress={handleTogglePlayback}
                  />
                  <ControlBtn
                    icon={ICONS.NEXT}
                    onPress={handleChangeToNextTrack}
                  />
                  <ControlBtn
                    icon={ICONS.REPEAT}
                    onPress={handleToggleRepeat}
                  />
                </S.PlayerControlsWrapper>
              </>
            )}
          </S.Body>
        </Gradient>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export const Player = () => {
  return (
    <SoundPlayerProvider>
      <PlayerComponent />
    </SoundPlayerProvider>
  );
};
