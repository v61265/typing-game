import styled from 'styled-components';
import React, { useCallback, useEffect } from 'react';
import UiSelectors from 'components/ui-selectors';
import { useState } from 'react';
import type { ModeObject } from 'types/common';
import Controller from 'components/controller';
import StatusBar from 'components/status-bar';
import axios from 'axios';
import CharactorsPlayground from 'components/charactors-playground';

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
  text-shadow: 4px 3px 0 ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.green};
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      font-size: 72px;
    }
  `}
`;

function App() {
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
  const [mode, setMode] = useState<ModeObject>({
    name: undefined,
    wording: '請選擇遊玩模式',
  });
  const [restTime, setRestTime] = useState<number>(60);
  const [playingState, setPlayingState] = useState('stop');
  const [score, setScore] = useState<number>(0);
  const [allTypeNumber, setAllTypeNumber] = useState<number>(0);
  const [correctTypeNumber, setCorrectTypeNumber] = useState<number>(0);
  const [target, setTarget] = useState<string[]>([]);

  const fetchWordTargetWords = useCallback(async () => {
    try {
      const { data } = await axios.get(
        'https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt'
      );
      const wordTargetsList = data.split(/\n/);
      setTarget(wordTargetsList);
    } catch (e) {
      console.log(e);
      setTarget([
        'fetch',
        'data',
        'error',
        'please',
        'connect',
        'v61265@gmail.com',
      ]);
    }
  }, []);
  const generateRandomChars = useCallback(() => {
    const result: string[] = [];
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 1000; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      const randomChar = characters.charAt(randomIndex);
      result.push(randomChar);
    }
    setTarget(result);
  }, []);

  const countDownTime = useCallback(() => {
    if (restTime) {
      setTimeout(() => {
        setRestTime((prev: number) => prev - 1);
      }, 1000);
    } else {
      setPlayingState('stop');
    }
  }, [restTime]);

  useEffect(() => {
    if (playingState === 'start') {
      countDownTime();
    } else if (playingState === 'stop') {
      setRestTime(60);
    }
  }, [playingState, countDownTime]);

  useEffect(() => {
    if (mode.name === 'word') {
      fetchWordTargetWords();
    } else {
      generateRandomChars();
    }
  }, [mode]);

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
            <CharactorsPlayground
              target={target}
              setCorrectTypeNumber={setCorrectTypeNumber}
              setAllTypeNumber={setAllTypeNumber}
              setScore={setScore}
              canType={playingState === 'start'}
            />
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
