import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  min-width: 48px;
  min-height: 48px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(225, 225, 225, 0.9);
  border-radius: 6px;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  .child,
  .child:after {
    transition: 0.5s;
  }
  &:hover {
    background: rgba(225, 225, 225, 0.9);
    cursor: pointer;
    .stop {
      background: ${({ theme }) => theme.color.primary};
    }
    .start {
      border-right: 12px solid ${({ theme }) => theme.color.primary};
    }
    .pause {
      background: ${({ theme }) => theme.color.primary};
      &:after {
        background: ${({ theme }) => theme.color.primary};
      }
    }
  }
  & + & {
    margin-left: 24px;
  }
`;

function UiButton({
  children,
  onClick,
}: {
  children: React.ReactNode | string;
  onClick: () => void;
}): JSX.Element {
  return (
    <ButtonWrapper className='button' onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
}

export default UiButton;
