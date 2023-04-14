import React, { useRef } from 'react';
import type { ModeObject } from 'types/common';
import styled from 'styled-components';
import { useState } from 'react';

const StatusBarContainer = styled.div`
  width: 100%;
  display: flex;
`;

const StatusSection = styled.div``;

const StatusTitle = styled.div``;

const StatusContent = styled.div``;

function StatusBar({
  score,
  restTime,
}: {
  score: number;
  restTime: number | undefined;
}): JSX.Element {
  return (
    <StatusBarContainer>
      <StatusSection>
        <StatusTitle>TIME LEFT</StatusTitle>
        <StatusContent>{restTime}</StatusContent>
      </StatusSection>
      <StatusSection>
        <StatusTitle>SCORE</StatusTitle>
        <StatusContent>{score}</StatusContent>
      </StatusSection>
    </StatusBarContainer>
  );
}

export default StatusBar;
