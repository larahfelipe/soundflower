import React from 'react';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { useTheme } from 'styled-components';

import { Gradient, Input, Loading, TranslatedEntry } from '@/components';
import { ICONS } from '@/constants';
import { useApp, useTrack } from '@/hooks';

import { ControlBtn, InputBtn, ProgressSlider, TrackInfo } from './components';
import { usePlayer } from './hooks';
import { SoundPlayerProvider } from './providers';
import * as S from './styles';

const PlayerComponent = () => {
  const { error } = useApp();
  const { track } = useTrack();
  const {
    handleToggleShuffleQueue,
    handleChangeToPreviousTrack,
    handleTogglePlayback,
    handleChangeToNextTrack,
    handleToggleRepeat,
    handleEnqueueTrack,
    setEnteredTrack,
    isAudioLoaded,
    isLooping,
    isShuffled,
    isPlaying
  } = usePlayer();

  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Wrapper>
        <S.Header>
          <TranslatedEntry on="YAxis" duration={700}>
            <Input
              placeholder="Search track"
              onChangeText={setEnteredTrack}
              onSubmitEditing={handleEnqueueTrack}
              rightContent={<InputBtn onPress={handleEnqueueTrack} />}
            />
          </TranslatedEntry>

          {!!error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.Header>

        <Gradient
          w="100%"
          h="95%"
          key={track?.id}
          colors={[
            colors.background,
            track.artwork.colors.DarkVibrant ?? colors.background,
            'transparent'
          ]}
        >
          <S.Body>
            <TrackInfo
              track={track}
              loading={!!track.title && !isAudioLoaded}
            />

            {!!track.title && !isAudioLoaded ? (
              <Loading text="Preparing track. Please wait" />
            ) : (
              <>
                <ProgressSlider />

                <S.PlayerControlsWrapper>
                  <ControlBtn
                    icon={ICONS.SHUFFLE}
                    active={isShuffled}
                    onPress={handleToggleShuffleQueue}
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
                    active={isLooping}
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
