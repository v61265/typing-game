import styled from 'styled-components';
import React from 'react';
import UiSelectors from 'components/ui-selectors';
import { useState } from 'react';
import type { ModeObject, restTime } from 'types/common';
import Controller from 'components/controller';
import StatusBar from 'components/status-bar';

const AppContainer = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  letter-spacing: 0.03em;
  line-height: 150%;
  background: ${({ theme }) => theme.color.primary};
`;

const ContentContainer = styled.div`
  margin: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      max-width: 768px;
    }
  `}
`;

const GameTitle = styled.h1`
  font-weight: 900;
  font-size: 36px;
  line-height: 150%;
  margin: 0;
  margin-top: 40px;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      font-size: 72px;
    }
  `}
`;

function App() {
  const [mode, setMode] = useState<ModeObject>({
    name: undefined,
    wording: '請選擇遊玩模式',
  });
  const [restTime, setRestTime] = useState<restTime>(60);
  const [playingState, setPlayingState] = useState('stop');
  const [score, setScore] = useState<number>(0);
  const ModeList: ModeObject[] = [
    {
      name: 'character',
      wording: '字母模式',
    },
    {
      name: 'word',
      wording: '單字模式',
    },
  ];
  return (
    <AppContainer>
      <ContentContainer>
        <GameTitle>TYPING GAME</GameTitle>
        {mode.name ? (
          <>
            {mode.wording}
            <Controller
              playingState={playingState}
              setPlayingState={setPlayingState}
            />
            <StatusBar score={score} restTime={restTime} />
          </>
        ) : (
          <UiSelectors
            selectedMode={mode}
            modeList={ModeList}
            setMode={setMode}
          />
        )}
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
