import React, { useMemo } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import type { TypingInfo, ScoreInfo } from 'types/common';

const Wrapper = styled.div<{ isMobile: boolean }>`
  margin-top: 24px;
  color: rgba(225, 225, 225, 0.9);
  width: 100%;
`;

const CharTargets = styled.div`
  display: flex;
  justify-content: center;
`;

const CharItem = styled.div<{
  hasDone: boolean;
  isMobile: boolean;
  isWrong: boolean;
}>`
  display: inline-block;
  font-size: 20px;
  transition: 0.5s;
  color: rgba(225, 225, 225, 0.9);
  text-shadow: -1px 0 ${({ theme }) => theme.color.black},
    0 1px ${({ theme }) => theme.color.black},
    1px 0 ${({ theme }) => theme.color.black},
    0 -1px ${({ theme }) => theme.color.black};
  & + & {
    margin-left: 0.5rem;
  }
  ${({ isMobile, theme }) =>
    !isMobile &&
    `
      ${theme.breakpoint.md} {
        font-size: 32px;
      }
  `}
  ${({ theme, hasDone }) =>
    hasDone &&
    `
      color: ${theme.color.green}
  `}
  ${({ theme, isWrong }) =>
    isWrong &&
    `
    color: ${theme.color.red}
  `}
`;

const InputGroup = styled.div<{ isMobile: boolean }>`
  ${isMobile &&
  `
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 94vw;
  `}
`;

const InputGround = styled.textarea`
  width: 100%;
  font-size: 20px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(225, 225, 225, 0.5);
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.black};
  letter-spacing: 0.5rem;
  display: block;
  resize: none;
  position: relative;
  &:focus {
    background: rgba(225, 225, 225, 0.7);
    outline: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.color.black};
    opacity: 0.5;
    position: relative;
  }
`;

const WordTargets = styled(CharTargets)`
  flex-direction: column;
  align-items: center;
`;

const WordItem = styled(CharItem)`
  & + & {
    margin-top: 12px;
    margin-left: 0;
  }
`;

const Hint = styled.div`
  color: #ffffff;
  margin-top: 24px;
`;

function Playground({
  target,
  canType,
  typingInfo,
  setScoreInfo,
  setTypingInfo,
  mode,
}: {
  target: string[];
  canType: boolean;
  typingInfo: TypingInfo;
  setTypingInfo: React.Dispatch<React.SetStateAction<TypingInfo>>;
  setScoreInfo: React.Dispatch<React.SetStateAction<ScoreInfo>>;
  mode: string;
}): JSX.Element {
  const renderTargetList = useMemo(() => {
    const targetWithIndex = target.map((item, index) => {
      return {
        content: item,
        index,
      };
    });
    if (mode === 'character') {
      if (typingInfo.nowIndex > 6) {
        return targetWithIndex.slice(
          typingInfo.nowIndex - 5,
          typingInfo.nowIndex + 5
        );
      }
      return targetWithIndex.slice(0, 11);
    }

    // word mode
    if (typingInfo.nowIndex > 2) {
      return targetWithIndex.slice(
        typingInfo.nowIndex - 1,
        typingInfo.nowIndex + 2
      );
    }
    return targetWithIndex.slice(0, 3);
  }, [typingInfo, target]);

  const calcCharModeScore = (value: string) => {
    setScoreInfo((prev) => {
      return {
        ...prev,
        allTypeNumber: prev.allTypeNumber + 1,
      };
    });
    if (value[value.length - 1] === target[typingInfo.nowIndex]) {
      setScoreInfo((prev) => {
        return {
          ...prev,
          correctTypeNumber: prev.correctTypeNumber + 1,
          score: prev.score + 10,
        };
      });
      setTypingInfo((prev) => {
        return {
          inputValue: value,
          nowIndex: prev.nowIndex + 1,
          isWrong: false,
        };
      });
    } else {
      setTypingInfo((prev) => {
        return {
          ...prev,
          isWrong: true,
        };
      });
      setScoreInfo((prev) => {
        let score;
        if (prev.score <= 2) {
          score = 0;
        }
        score = prev.score - 2;
        return {
          ...prev,
          score,
        };
      });
    }
  };
  const calcWordModeScore = (value: string) => {
    setScoreInfo((prev) => {
      return {
        ...prev,
        allTypeNumber: prev.allTypeNumber + 1,
      };
    });
    setTypingInfo((prev) => {
      return {
        ...prev,
        isWrong: false,
      };
    });
    if (value.toLowerCase() === target[typingInfo.nowIndex]) {
      setScoreInfo((prev) => {
        return {
          ...prev,
          correctTypeNumber: prev.correctTypeNumber + 1,
          score: prev.score + 100,
        };
      });
      setTypingInfo((prev) => {
        return {
          inputValue: '',
          nowIndex: prev.nowIndex + 1,
          isWrong: false,
        };
      });
    } else {
      setTypingInfo((prev) => {
        return {
          ...prev,
          isWrong: true,
        };
      });
      setScoreInfo((prev) => {
        let score;
        if (prev.score <= 25) {
          score = 0;
        }
        score = prev.score - 25;
        return {
          ...prev,
          score,
        };
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (mode === 'character') {
      calcCharModeScore(value.toString());
    } else {
      setTypingInfo((prev) => {
        return {
          ...prev,
          inputValue: value,
        };
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mode === 'word' && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      calcWordModeScore(e.currentTarget.value);
    }
    if (e.key === 'Backspace') {
      if (mode === 'character' || !typingInfo.inputValue) {
        e.preventDefault();
      } else {
        setScoreInfo((prev) => {
          let score;
          if (prev.score <= 15) {
            score = 0;
          }
          score = prev.score - 15;
          return {
            ...prev,
            score,
          };
        });
      }
    }
  };

  return (
    <Wrapper isMobile={isMobile}>
      {mode === 'character' ? (
        <CharTargets>
          {renderTargetList?.map((charItem, index) => {
            return (
              <CharItem
                key={index}
                hasDone={charItem.index < typingInfo.nowIndex}
                isMobile={isMobile}
                isWrong={
                  typingInfo.isWrong && charItem.index === typingInfo.nowIndex
                }
              >
                {charItem.content}
              </CharItem>
            );
          })}
        </CharTargets>
      ) : (
        <WordTargets>
          {renderTargetList?.map((wordItem, index) => {
            return (
              <WordItem
                key={index}
                hasDone={wordItem.index < typingInfo.nowIndex}
                isMobile={isMobile}
                isWrong={
                  typingInfo.isWrong && wordItem.index === typingInfo.nowIndex
                }
              >
                {wordItem.content}
              </WordItem>
            );
          })}
        </WordTargets>
      )}

      <InputGroup isMobile={isMobile}>
        {!canType && <Hint>請按上方三角形開始遊玩</Hint>}
        <InputGround
          value={typingInfo.inputValue}
          onChange={handleOnChange}
          disabled={!canType}
          onKeyDown={handleKeyDown}
        ></InputGround>
      </InputGroup>
    </Wrapper>
  );
}

export default Playground;
