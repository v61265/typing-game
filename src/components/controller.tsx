import UiButton from './ui-button';
import styled from 'styled-components';
import type { playingState } from 'types/common';

const ControllerWrapper = styled.div`
  margin-top: 24px;
  display: flex;
`;

const StartIcon = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 12px solid rgba(225, 225, 225, 0.9);
`;

const StopIcon = styled.div`
  width: 16px;
  height: 16px;
  background: rgba(225, 225, 225, 0.9);
`;

const PauseIcon = styled.div`
  height: 16px;
  width: 6px;
  background: rgba(225, 225, 225, 0.9);
  position: absolute;
  transform: translate(-6px);
  &:after {
    content: '';
    display: block;
    position: relative;
    top: 0;
    left: 12px;
    height: 16px;
    width: 6px;
    background: rgba(225, 225, 225, 0.9);
  }
`;

function Controller({
  playingState,
  setPlayingState,
}: {
  playingState: playingState;
  setPlayingState: React.Dispatch<React.SetStateAction<playingState>>;
}): JSX.Element {
  const handleOnClickStartAndPause = () => {
    playingState === 'start'
      ? setPlayingState('pause')
      : setPlayingState('start');
  };
  const handleOnClickStop = () => {
    setPlayingState('stop');
  };

  return (
    <ControllerWrapper>
      <UiButton onClick={handleOnClickStartAndPause}>
        {playingState === 'start' ? (
          <PauseIcon className='pause child' />
        ) : (
          <StartIcon className='start child' />
        )}
      </UiButton>
      <UiButton onClick={handleOnClickStop}>
        <StopIcon className='stop child' />
      </UiButton>
    </ControllerWrapper>
  );
}

export default Controller;
