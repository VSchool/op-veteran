import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {Stage, Layer, Rect, Text} from 'react-konva'
import {CanvasContext} from '../../../context/CanvasProvider'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import {BoothContext} from '../../../context/BoothProvider'
import BoothCard from '../../../components/BoothCard/BoothCard'
import Map from './Map/Map'
import Diagram from './Diagram/Diagram'
import Section from './Section'
import {Button} from '../../../components/Button'
import Legend from './Map/Legend'
import {
  LandingContainer,
  Logo,
  Subheader,
  Header,
  HeaderWrapper,
  ButtonWrapper,
  FormWrapper,
  Row,
  Container
} from "../../../Elements/basic"
const ModeButton = styled.button`
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: clamp(300px, 80%, 450px);
  height: clamp(600px, 70%, 900px);
`
const BoothManagement = (props) => {
  const [mapMode, setMapMode] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const {user} = useContext(UserContext)
  const {currentVendor, updateCurrentVendor} = useContext(VendorContext)
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
  const {booths, reserveBooth, pullMapDataFromFirestore} = useContext(BoothContext)
  const handleClick = ()=>{setCurrentSection("")}
  useEffect(() => {
    pullMapDataFromFirestore();
  },[])
  return ( 
    <>
    <ModeButton onClick={(e)=>{
      e.preventDefault();
      setMapMode(!mapMode)
    }}>{mapMode ? "Switch to diagram view" : "Switch to map view"}</ModeButton>
    {mapMode ?
     <Map setShowInfo={setShowInfo} mapMode={mapMode} setMapMode={setMapMode}/>
      : 
      <Diagram mapMode={mapMode} setMapMode={setMapMode}/>}
    {currentBooth === null ? null : <BoothCard reserveBooth={reserveBooth} setCurrentBooth={setCurrentBooth} data={booths.filter(b=>b.id === currentBooth)[0]}/>}
  {showInfo ? <Legend/> : null}
    </>
    )
}
export default BoothManagement