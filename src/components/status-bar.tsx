import styled from 'styled-components';

const StatusBarContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 24px;
  justify-content: center;
  color: rgba(225, 225, 225, 0.9);
`;

const StatusSection = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
  & + & {
    margin-left: 32px;
    align-items: flex-start;
  }
`;

const StatusTitle = styled.div`
  font-size: 20px;
`;

const StatusContent = styled.div`
  font-size: 24px;
  margin-top: 12px;
`;

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
