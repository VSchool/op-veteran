import React from 'react'
import styled from 'styled-components'
import Playground from './Playground'

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  border: 1px solid lightcoral;
`

export default function App() {

  return (
    <AppContainer>
      <Playground />
    </AppContainer>
  )
}