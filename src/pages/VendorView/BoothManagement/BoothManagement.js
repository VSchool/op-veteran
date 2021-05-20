import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {Stage, Layer, Rect, Text} from 'react-konva'
import {CanvasContext} from '../../../context/CanvasProvider'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import {BoothContext} from '../../../context/BoothProvider'

import Map from './Map'
import Section from './Section'
import firestore from '../../../database'
import {
  LandingContainer,
  Logo,
  Subheader,
  Header,
  HeaderWrapper,
  ButtonWrapper,
  FormWrapper,
  Wrapper,
  Row,
  Container
} from "../../../Elements/basic"

const BoothManagement = (props) => {
  const {user} = useContext(UserContext)
  const {vendor, updateCurrentVendor} = useContext(VendorContext)
  const {
    scale,
    setScale,
    stageSize,
    setStageSize,
    modes,
    changeMode,
    fitStageIntoParentContainer,
    currentSection,
    setCurrentSection,
    currentRow,
    setCurrentRow,
    currentBooth,
    setCurrentBooth
  } = useContext(CanvasContext)

  

  return ( 
    currentSection === ""
      ? <Map/>
      : <Section
          sectionId={currentSection}
          setSelectedSection={setCurrentSection}
          setSelectedBooth={setCurrentBooth}
        stageSize={stageSize}
        />
    )
}
export default BoothManagement