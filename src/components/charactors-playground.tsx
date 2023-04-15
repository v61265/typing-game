import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

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
  setCorrectTypeNumber,
  setAllTypeNumber,
  setScore,
  canType,
}: {
  target: string[];
  setCorrectTypeNumber: React.Dispatch<React.SetStateAction<number>>;
  setAllTypeNumber: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  canType: boolean;
}): JSX.Element {
  const [nowIndex, setNowIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string | number>('');
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const renderTargetList = useMemo(() => {
    const targetWithIndex = target.map((item, index) => {
      return {
        content: item,
        index,
      };
    });
    if (nowIndex > 6) {
      return targetWithIndex.slice(nowIndex - 5, nowIndex + 5);
    }
    return targetWithIndex.slice(0, 11);
  }, [nowIndex, target]);
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAllTypeNumber((prev) => prev + 1);
    if (value[value.length - 1] === target[nowIndex]) {
      setInputValue(value);
      setNowIndex((prev) => prev + 1);
      setCorrectTypeNumber((prev) => prev + 1);
      setIsWrong(false);
      setScore((prev) => prev + 10);
    } else {
      setIsWrong(true);
      setScore((prev) => {
        if (prev < 2) {
          return 0;
        }
        return prev - 2;
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
              hasDone={charItem.index < nowIndex}
              isMobile={isMobile}
              isWrong={isWrong && charItem.index === nowIndex}
            >
              {charItem.content}
            </CharItem>
          );
        })}
      </TargetGround>
      <InputGround
        isMobile={isMobile}
        value={inputValue}
        onChange={handleOnChange}
        disabled={!canType}
      ></InputGround>
    </Wrapper>
  );
}

export default CharactorsPlayground;
