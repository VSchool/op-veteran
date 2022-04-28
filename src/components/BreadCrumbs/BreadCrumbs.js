import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { CanvasContext } from '../../context/CanvasProvider'

const Wrapper = styled.div`
  display: flex;
`

const BreadCrumbs = (props) => {
  const { currentSection, setCurrentSection, currentBooth, setCurrentBooth } =
    useContext(CanvasContext)
  return <Wrapper></Wrapper>
}

export default BreadCrumbs
