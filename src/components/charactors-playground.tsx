import React, { useMemo } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import type { TypingInfo, ScoreInfo } from 'types/common';

const Wrapper = styled.div<{ isMobile: boolean }>`
  margin-top: 24px;
  color: rgba(225, 225, 225, 0.9);
  width: 100%;
`;

const TargetGround = styled.div`
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

const InputGround = styled.textarea<{ isMobile: boolean }>`
  width: 100%;
  font-size: 20px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(225, 225, 225, 0.5);
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.black};
  letter-spacing: 0.5rem;
  display: block;
  &:focus {
    background: rgba(225, 225, 225, 0.7);
    outline: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.color.black};
    opacity: 0.5;
  }
  ${isMobile &&
  `
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 94vw;
  `}
`;

function CharactorsPlayground({
  target,
  canType,
  typingInfo,
  setScoreInfo,
  setTypingInfo,
}: {
  target: string[];
  canType: boolean;
  typingInfo: TypingInfo;
  setTypingInfo: React.Dispatch<React.SetStateAction<TypingInfo>>;
  setScoreInfo: React.Dispatch<React.SetStateAction<ScoreInfo>>;
}): JSX.Element {
  const renderTargetList = useMemo(() => {
    const targetWithIndex = target.map((item, index) => {
      return {
        content: item,
        index,
      };
    });
    if (typingInfo.nowIndex > 6) {
      return targetWithIndex.slice(
        typingInfo.nowIndex - 5,
        typingInfo.nowIndex + 5
      );
    }
    return targetWithIndex.slice(0, 11);
  }, [typingInfo, target]);
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
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
  return (
    <Wrapper isMobile={isMobile}>
      <TargetGround>
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
      </TargetGround>
      <InputGround
        isMobile={isMobile}
        value={typingInfo.inputValue}
        onChange={handleOnChange}
        disabled={!canType}
      ></InputGround>
    </Wrapper>
  );
}

export default CharactorsPlayground;
