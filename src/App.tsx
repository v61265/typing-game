import styled from 'styled-components'
import React from 'react'

const AppContainer = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex;direction: column;
  color: #fff;
  letter-spacing: 0.03em;
  line-height: 150%;
  background: ${({ theme }) => theme.color.primary}
`

const GameTitle = styled.h1`
  font-weight: 900;
  font-size: 36px;
  line-height: 150%;
  margin-top: 40px;
`

function App() {
  return (
    <AppContainer>
      <GameTitle>TYPING GAME</GameTitle>
    </AppContainer>
  )
}

export default App
