import React, { useContext } from 'react'
import styled from 'styled-components'
import { handleIncrement, handleDecrement } from './utils'
import { CountContext } from './context/Counter'
import { Display } from './components/Display'
import { Button } from './components/Button'

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`

const ButtonWrapper = styled.div`
  width: 200px;
  height: 88px;
  position: relative;
  top: 48px;
  left: calc(50% - 200px/2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default function App() {
  const [count, setCount] = useContext(CountContext)

  return (
    <AppContainer>
      <Display count={count} />
      <ButtonWrapper>
        <Button buttonText={'Increment'} buttonStyle={'primary'} onClick={() => handleIncrement(count, setCount)} />
        <Button buttonText={'Decrement'} buttonStyle={'secondary'} onClick={() => handleDecrement(count, setCount)} />
      </ButtonWrapper>
    </AppContainer>
  )
}