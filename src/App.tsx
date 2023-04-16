import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import UiSelectors from 'components/ui-selectors';
import { useState } from 'react';
import type {
  ModeObject,
  playingState,
  TypingInfo,
  ScoreInfo,
} from 'types/common';
import Controller from 'components/controller';
import StatusBar from 'components/status-bar';
import axios from 'axios';
import CharactorsPlayground from 'components/charactors-playground';
import Modal from 'components/modal';

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
  const [playingState, setPlayingState] = useState<playingState>(undefined);
  const [target, setTarget] = useState<string[]>([]);
  const [scoreInfo, setScoreInfo] = useState<ScoreInfo>({
    allTypeNumber: 0,
    correctTypeNumber: 0,
    score: 0,
  });
  const [typingInfo, setTypingInfo] = useState<TypingInfo>({
    nowIndex: 0,
    isWrong: false,
    inputValue: '',
  });

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

  const restart = () => {
    setPlayingState(undefined);
    setRestTime(60);
    setScoreInfo(() => {
      return {
        score: 0,
        allTypeNumber: 0,
        correctTypeNumber: 0,
      };
    });
    setTypingInfo(() => {
      return {
        nowIndex: 0,
        isWrong: false,
        inputValue: '',
      };
    });
    if (mode.name === 'word') {
      fetchWordTargetWords();
    } else {
      generateRandomChars();
    }
  };

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
            <StatusBar score={scoreInfo.score} restTime={restTime} />
            <CharactorsPlayground
              target={target}
              canType={playingState === 'start'}
              setScoreInfo={setScoreInfo}
              setTypingInfo={setTypingInfo}
              typingInfo={typingInfo}
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
      {playingState === 'stop' && (
        <Modal scoreInfo={scoreInfo} restart={restart} />
      )}
    </AppContainer>
  );
}

export default App;
