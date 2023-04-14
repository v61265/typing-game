import React, { useRef } from 'react';
import type { ModeObject } from 'types/common';
import styled from 'styled-components';
import { useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';

const SelectorContainer = styled.div`
  position: relative;
  margin-top: 24px;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      font-size: 24px;
    }
  `}
`;

const SelectButton = styled.button<{ isOpen: boolean }>`
  width: 275px;
  padding: 10px;
  background: rgba(0, 0, 0, 0);
  color: rgba(225, 225, 225, 0.9);
  border: 1px solid rgba(225, 225, 225, 0.9);
  border-radius: 6px;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  &:hover {
    background: rgba(225, 225, 225, 0.9);
    color: ${({ theme }) => theme.color.primary};
    cursor: pointer;
    &:after {
      border-top: 2px solid ${({ theme }) => theme.color.primary};
      border-left: 2px solid ${({ theme }) => theme.color.primary};
    }
  }
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      font-size: 24px;
      padding: 20px;
      width: 600px;
    }
  `}
  ${({ isOpen }) =>
    isOpen &&
    `
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}

  &:after {
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    border-top: 2px solid rgba(225, 225, 225, 0.9);
    border-left: 2px solid rgba(225, 225, 225, 0.9);
    margin-left: 8px;
    transform: rotate(45deg) translate(50%);
    transition: 0.5s;
    ${({ theme, isOpen }) => `
      ${theme.breakpoint.md} {
        width: 18px;
        height: 18px;
        margin-left: 10px;
      }
      ${
        isOpen &&
        `
        transform: rotate(225deg);
        margin-left: 10px;
      `
      }
    `}
  }
`;

const SelectListContainer = styled.ul`
  background: rgba(0, 0, 0, 0);
  color: rgba(225, 225, 225, 0.9);
  margin: 0;
  padding: 0;
  background: rgba(225, 225, 225, 0.9);
  border-top: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: 0.5s;
  color: ${({ theme }) => theme.color.primary};
`;

const OptionItem = styled.li`
  display: block;
  padding: 10px;
  display: flex;
  justify-content: center;
  transition: 0.5s;
  &:hover {
    background: #ffffff;
    cursor: pointer;
    &:last-child {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      padding: 20px;
    }
  `}
`;

function UiSelectors({
  modeList,
  selectedMode,
  setMode,
}: {
  modeList: ModeObject[];
  selectedMode: ModeObject;
  setMode: React.Dispatch<React.SetStateAction<ModeObject>>;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleOnClickButton = () => {
    setIsOpen(!isOpen);
  };
  const handleOnClickOption = (mode: ModeObject) => {
    setMode(mode);
    setIsOpen(false);
  };
  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(selectorRef, handleClickOutside);

  return (
    <SelectorContainer ref={selectorRef}>
      <SelectButton onClick={handleOnClickButton} isOpen={isOpen}>
        {selectedMode?.wording ?? '請選擇你想玩的模式'}
      </SelectButton>
      {isOpen && (
        <SelectListContainer>
          {modeList.map((modeItem, index) => {
            return (
              <OptionItem
                key={index}
                onClick={() => handleOnClickOption(modeItem)}
              >
                {modeItem.wording}
              </OptionItem>
            );
          })}
        </SelectListContainer>
      )}
    </SelectorContainer>
  );
}

export default UiSelectors;
