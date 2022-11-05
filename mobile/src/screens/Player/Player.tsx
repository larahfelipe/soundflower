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
  const { preparePlayback, togglePlayback, isAudioLoaded, isPlaying } =
    useSoundPlayer();

  const { colors } = useTheme();

  const handlePreparePlayback = async () => await preparePlayback(enteredTrack);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Wrapper>
        <S.Header>
          <Input
            placeholder="Search track"
            onChangeText={setEnteredTrack}
            onSubmitEditing={handlePreparePlayback}
            rightContent={<InputBtn onPress={handlePreparePlayback} />}
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
                  <ControlBtn icon={ICONS.SHUFFLE} onPress={() => null} />
                  <ControlBtn icon={ICONS.PREVIOUS} onPress={() => null} />
                  <ControlBtn
                    icon={isPlaying ? ICONS.PAUSE : ICONS.PLAY}
                    onPress={togglePlayback}
                  />
                  <ControlBtn icon={ICONS.NEXT} onPress={() => null} />
                  <ControlBtn icon={ICONS.REPEAT} onPress={() => null} />
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
