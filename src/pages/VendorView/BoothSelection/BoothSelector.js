import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {Stage, Layer, Rect, Text} from 'react-konva'
import {CanvasContext} from '../../../context/CanvasProvider'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import {BoothContext} from '../../../context/BoothProvider'
import Section from './Sections/Section'
import sections from './Sections/data'
import Map from './Sections/Map'
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

const Breadcrumbs = styled.p `
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    color: #545454; 
  `
//   const Wrapper  = styled.div`     width: 100vw;     height: 100vh; overflow:
// hidden;     display: flex;     flex-direction: column; position: relative; `
// const boothRef = firestore.collection("Booths");

const BoothSelection = (props) => {
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
    setCurrentRow
  } = useContext(CanvasContext)
  const [mapData,
    setMapData] = useState({})
  const {booths} = useContext(BoothContext)
  
  useEffect(() => {
    changeMode(modes.SQUARE)
    fitStageIntoParentContainer();
  }, [])

  useEffect(() => {
    window.addEventListener('resize', fitStageIntoParentContainer)

    return () => {
      window.removeEventListener('resize', fitStageIntoParentContainer)
    }
  }, [])
  
  return (
    <Wrapper alignment="flex-start" showOverflow={true} padding="16px">
      <HeaderWrapper>
        <Header>Booth Selection</Header>
        <Subheader>Choose Section</Subheader>
        <Breadcrumbs>
          {`All Sections ${currentSection === "All Sections"
            ? " " : " >  " + currentSection
            } ${currentRow === "All Rows"
              ? " " : " > " + currentRow
              }`}
        </Breadcrumbs>
      </HeaderWrapper>
      <Stage width={stageSize.w} height={stageSize.h} scale={scale}>
        <Layer>
          {/* {booths ? <Section data={booths.Alpha} stageSize={stageSize} name="Alpha" changeLevel={changeLevel}/> :<Text text="loading..."/>}  */}
          {currentSection !== "All Sections"
            ? <Section
                data={booths[currentSection]}
                changeMode={changeMode}
                modes={modes}
                stageSize={stageSize}
                name={currentSection}
                setCurrentRow={setCurrentRow}
                setCurrentSection={setCurrentSection}/>
            : <Map
              mapData={booths}
              stageSize={stageSize}
              setCurrentSection={setCurrentSection}
              setCurrentRow={setCurrentRow}
              changeMode={changeMode}
              modes={modes}
           />}
        </Layer>
      </Stage>
    </Wrapper>
  )
}

export default BoothSelection