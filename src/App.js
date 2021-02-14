import React from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  border: 1px solid lightcoral;
`

export default function App() {

  return (
    <AppContainer>
      <h1>App Component</h1>
    </AppContainer>
  )
}