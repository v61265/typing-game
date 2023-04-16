import UiButton from './ui-button';
import styled from 'styled-components';
import { useMemo, useRef } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import type { ScoreInfo } from 'types/common';

const WindowContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  padding: 8px;
  background: #ffffff;
  width: 70vw;
  padding: 20px;
  border-radius: 10px;
  color: ${({ theme }) => theme.color.primary};
  .button {
    margin: 0 auto;
    margin-top: 24px;
    color: ${({ theme }) => theme.color.primary};
    &:hover {
      color: #ffffff;
      background: ${({ theme }) => theme.color.primary};
    }
  }
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  color: ${({ theme }) => theme.color.primary};
  text-align: center;
`;

const Desc = styled.p`
  text-align: center;
`;

const DataSection = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  font-size: 18px;
  & + & {
    margin-top: 12px;
  }
`;

const DataTitle = styled.span`
  font-weigth: 900;
  color: ${({ theme }) => theme.color.green};
`;

const DataInfo = styled.span``;

function Modal({
  restart,
  scoreInfo,
}: {
  restart: () => void;
  scoreInfo: ScoreInfo;
}): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, restart);
  const accuracy = useMemo(() => {
    if (!scoreInfo.allTypeNumber) return '0%';
    const accuracyNum =
      (scoreInfo.correctTypeNumber / scoreInfo.allTypeNumber) * 100;
    return `${accuracyNum.toFixed(2)}%`;
  }, [scoreInfo]);
  return (
    <WindowContainer>
      <ModalContainer ref={modalRef}>
        <ModalTitle>RESULT</ModalTitle>
        <Desc>Here are some datas for you:</Desc>
        <DataSection>
          <DataTitle>CHARACTERS TYPED</DataTitle>
          <DataInfo>{scoreInfo.allTypeNumber}</DataInfo>
        </DataSection>
        <DataSection>
          <DataTitle>CORRECT CHARACTERS</DataTitle>
          <DataInfo>{scoreInfo.correctTypeNumber}</DataInfo>
        </DataSection>
        <DataSection>
          <DataTitle>ACCURACY</DataTitle>
          <DataInfo>{accuracy}</DataInfo>
        </DataSection>
        <DataSection>
          <DataTitle>SCORE</DataTitle>
          <DataInfo>{scoreInfo.score}</DataInfo>
        </DataSection>
        <UiButton onClick={restart}>RESTART</UiButton>
      </ModalContainer>
    </WindowContainer>
  );
}

export default Modal;
