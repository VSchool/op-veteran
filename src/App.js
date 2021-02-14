import React from 'react'
import styled from 'styled-components'
import Playground from './Playground'
import { Landing, Vendor } from './pages'


const AppContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  position: relative;
  // border: 1px solid lightcoral;
`

export default function App() {

  return (
    <AppContainer>
      <Playground />
      {/* <Landing /> */}
      {/* <Vendor /> */}
    </AppContainer>
  )
}