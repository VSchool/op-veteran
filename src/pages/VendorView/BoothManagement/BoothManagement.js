import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import { Stage, Layer, Rect, Text } from 'react-konva'
import { CanvasContext } from '../../../context/CanvasProvider'
import { UserContext } from '../../../context/UserProvider'
import { VendorContext } from '../../../context/VendorProvider'
import { BoothContext } from '../../../context/BoothProvider'
import { CartContext } from '../../../context/CartProvider'
import BoothCard from '../../../components/BoothCard/BoothCard'
import Map from './Map/Map'
import Diagram from './Diagram/Diagram'
import Section from './Section'
import { Button } from '../../../components/Button'
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
  Container,
} from '../../../Elements/basic'
const ModeButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.bgcolor};
  margin: 30px 10px;
  border: none;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 0.5rem;
  letter-spacing: 1px;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
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
  const closeModal = () => {
    setModalOptions((prev) => ({ ...prev, isOpen: false }))
  }
  const [showTrees, setShowTrees] = useState(true)
  const [modalOptions, setModalOptions] = useState({
    options: [],
    isOpen: false,
    visible: false,
    close: closeModal,
  })
  const { states, changeState } = props
  const [containerWidth, setContainerWidth] = useState(0)
  const [mapMode, setMapMode] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [organizedBooths, setOrganizedBooths] = useState([])
  const { user } = useContext(UserContext)
  const { currentVendor, updateCurrentVendor } = useContext(VendorContext)
  const { addPrimaryBoothToLocalCart, addSecondaryBoothToLocalCart } =
    useContext(CartContext)
  const [secondary, setSecondary] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isDoubleBoothOpen, setIsDoubleBoothOpen] = useState(false)
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
    getContainerWidth,
  } = useContext(CanvasContext)

  const {
    booths,
    reserveBooth,
    pullMapDataFromFirestore,
    organizeBoothData,
    statusCodes,
  } = useContext(BoothContext)

  const handleSelectBooth = (_id, secondary = false) => {
    if (secondary) {
      // addSecondaryBoothToCart(_id);
      addSecondaryBoothToLocalCart(_id)
      setIsDoubleBoothOpen(false)
    } else {
      // addPrimaryBoothToCart(_id);
      addPrimaryBoothToLocalCart(_id)
      handleClose()
      checkNeighbors()
    }
  }

  const handleClose = () => {
    setIsDoubleBoothOpen(false)
    setCurrentBooth(null)
  }

  const selectedBooth = booths.filter((booth) => booth.id === currentBooth)[0]

  console.log("selectedBooth", selectedBooth)  //kelly -- this is coming up as undefined now
  const checkNeighbors = () => {
    const options = booths.reduce((response, b) => {
      if (
        selectedBooth.neighbors.includes(b.id) &&
        (b.status === 0 || b.status === 'open')
      ) {
        response.push(b.id)
      }
      return response
    }, [])
    if (options.length > 0) {
      setModalOptions((prev) => ({
        ...prev,
        options: options,
      }))
      setIsDoubleBoothOpen(true)
    }
  }

  useEffect(() => {
    const data = organizeBoothData()
    const width = getContainerWidth()
    setContainerWidth(width)
    setOrganizedBooths(data)
  }, [])

  return (
    <>
      {isDoubleBoothOpen && (
        <DoubleBoothModal
          options={modalOptions.options}
          handleSelectBooth={handleSelectBooth}
          close={handleClose}
        />
      )}
      <ButtonWrapper>
        <ModeButton
          bgcolor='#e67e22'
          onClick={(e) => {
            e.preventDefault()
            if (mapMode) {
              setMapMode(false)
              enterDiagramMode()
            } else {
              setMapMode(true)
              enterMapMode()
            }
          }}
        >
          {mapMode ? 'Switch to diagram view' : 'Switch to map view'}
        </ModeButton>
        <ModeButton
          bgcolor='#27ae60'
          onClick={(e) => {
            e.preventDefault()
            setShowTrees(!showTrees)
          }}
        >
          {showTrees ? 'Hide Trees' : 'Show Trees'}
        </ModeButton>
        <ModeButton
          bgcolor='#95a5a6'
          onClick={(e) => {
            e.preventDefault()
            setShowInfo(!showInfo)
          }}
        >
          {showInfo ? 'Hide instructions' : 'Show instructions'}
        </ModeButton>
      </ButtonWrapper>
      {mapMode ? (
        <Map
          showTrees={showTrees}
          setModalOptions={setModalOptions}
          containerWidth={containerWidth}
          setShowInfo={setShowInfo}
          mapMode={mapMode}
          setMapMode={setMapMode}
        />
      ) : (
        <Diagram
          containerWidth={containerWidth}
          mapMode={mapMode}
          setMapMode={setMapMode}
        />
      )}
      {currentBooth && (
        // When a booth is selected, CanvasProvider receives the booth data, and the BoothCard component is rendered via currentBooth
        <BoothCard
          handleSelectBooth={handleSelectBooth}
          handleClose={handleClose}
          data={selectedBooth}
        />
      )}
      {showInfo && <Legend />}
      {secondary && <StatusMessage />}{' '}
    </>
  )
}
export default BoothManagement
