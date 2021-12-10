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
import StatusMessage from '../../../components/StatusMessage'
import DoubleBoothModal from '../../../components/BoothCard/DoubleBoothModal'
import {
  LandingContainer,
  Logo,
  Subheader,
  Header,
  HeaderWrapper,
  FormWrapper,
  Row,
  Container
} from "../../../Elements/basic"
const ModeButton = styled.button `
padding: 10px;
background-color: ${props => props.bgcolor};
margin: 10px;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content:space-around;
  align-items: center;
`
const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: clamp(300px, 80%, 450px);
  height: clamp(600px, 70%, 900px);
`
const BoothManagement = (props) => {
  const closeModal = ()=>{setModalOptions(prev=>({...prev, isOpen: false}))}
  const [showTrees, setShowTrees] = useState(true);
  const [modalOptions, setModalOptions] = useState({handleSelectBooth: null, options: [], isOpen: false,  visible: false, close: closeModal})
  const {states, changeState} = props
  const [containerWidth, setContainerWidth] = useState(0)
  const [mapMode, setMapMode] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [organizedBooths, setOrganizedBooths] = useState([])
  const {user} = useContext(UserContext)
  const {currentVendor, updateCurrentVendor} = useContext(VendorContext)
  const [secondary, setSecondary] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
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
    setCurrentBooth,
    enterDiagramMode,
    enterMapMode,
    getContainerWidth
  } = useContext(CanvasContext)
  const {booths, reserveBooth, pullMapDataFromFirestore, organizeBoothData, statusCodes} = useContext(BoothContext)

  useEffect(() => {
    const data = organizeBoothData();
    const width = getContainerWidth()
    setContainerWidth(width)
    setOrganizedBooths(data)
  }, [])
  
  return (
    
    <> 
    <DoubleBoothModal states={states} changeState={changeState} isOpen={modalOptions.isOpen} close={modalOptions.close} visible={modalOptions.visible} options={modalOptions.options} handleSelectBooth={modalOptions.handleSelectBooth}/>
  <ButtonWrapper>
  <ModeButton
  bgcolor="palegoldenrod"
      onClick={(e) => {
      e.preventDefault();
      if (mapMode) {
        setMapMode(false)
        enterDiagramMode()
      } else {
        setMapMode(true)
        enterMapMode()
      }
    }}>
    {mapMode
        ? "Switch to diagram view"
        : "Switch to map view"}</ModeButton>
    <ModeButton   bgcolor="palegreen" onClick={(e)=>{
      e.preventDefault()
      setShowTrees(!showTrees)
      }}>{showTrees ? "Hide Trees" : "Show Trees"}</ModeButton>
      <ModeButton bgcolor="paleblue" onClick={(e)=>{
        e.preventDefault()
        setShowInfo(!showInfo)}}>{showInfo ? "Hide instructions" : "Show instructions"}</ModeButton>
      
  </ButtonWrapper>
    {
    mapMode
      ? <Map
          showTrees = {showTrees}
          setModalOptions={setModalOptions}
          containerWidth={containerWidth}
          setShowInfo={setShowInfo}
          mapMode={mapMode}
          setMapMode={setMapMode}/>
      : <Diagram
          containerWidth={containerWidth}
          mapMode={mapMode}
          setMapMode={setMapMode}/>
  }
  {
    currentBooth
      ? <BoothCard
          setModalOptions={setModalOptions}
          statusCodes={statusCodes}
          states={states}
          changeState={changeState}
          setCurrentBooth={setCurrentBooth}
          reserveBooth={reserveBooth}
          data={booths.filter(b => b.id === currentBooth)[0]}/>
      : null
  }
  {
    showInfo
      ? <Legend/>
      : null
  }
  {
    secondary
      ? <StatusMessage/>
      : null
  } </>
    )
}
export default BoothManagement