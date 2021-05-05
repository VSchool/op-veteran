import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {Stage, Layer, Rect} from 'react-konva'
import {BoothContext} from '../../../context/BoothProvider'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import Section from './Sections/Section'
import sections from './Sections/data'
import Map from '../BoothSelection/Sections/Map'
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
  
  const Breadcrumbs = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    color: #545454; 
  `
//   const Wrapper  = styled.div`
//     width: 100vw;
//     height: 100vh;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     position: relative;
// `
const BoothSelection = (props)=>{
const {user} = useContext(UserContext)
const {vendor, updateCurrentVendor} = useContext(VendorContext)
const [scale, setScale]  = useState(Math.floor(window.innerWidth/1024))
const [level, setLevel] = useState({
    section: "All Sections",
    row: null, 
    booth: null
})
debugger
const checkScale = () => {
    const percent = window.innerWidth/1024
    setScale(percent,percent)
}
React.useEffect(() => {

  window.addEventListener('resize', checkScale)
  return () => window.removeEventListener('resize', checkScale)

}, [])

// do your calculations for stage properties

// ...
return (
    <Wrapper>
        <HeaderWrapper>
            <Header>Booth Selection</Header>
            <Subheader>Choose Section</Subheader>
        <Breadcrumbs>
            {`${level.section} ${level.row ? `> ${level.row}` : ""}`}
        </Breadcrumbs>
        </HeaderWrapper>
        <Stage width={1024} height={1024} scale={scale}>
            <Layer>
                   <Map/>
            </Layer>
        </Stage>
    </Wrapper>
)
}

export default BoothSelection