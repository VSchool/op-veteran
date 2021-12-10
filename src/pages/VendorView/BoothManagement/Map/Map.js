import React, {useState, useContext, useEffect} from "react";
import {CanvasContext} from "../../../../context/CanvasProvider";
import {BoothContext} from "../../../../context/BoothProvider";
import {VendorContext} from "../../../../context/VendorProvider";
import {
  Stage,
  Layer,
  Group,
  Image,
  Rect,
  Path,
  Text,
  Circle
} from "react-konva";
import useImage from "use-image";
import styled from 'styled-components'
import BlankMapPathLayer from './BlankMapPathLayer'
import Row from './Row'
import treeData from "./treeData";
const SuperStage = styled(Stage)`

  width: ${props => props.containerWidth};
  height: ${props => props.containerWidth};
  margin: auto;
  overflow: hidden;
`
const SuperLayer = styled(Layer)`

`
const StageWrapper = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

// const SectionSelector = (props) => {   const {     setCurrentSection,     x,
//    y,     width,     height,     sectionId   } = props   const [opacity,
// setOpacity] = useState(0)     const handleClick = (sectionId) => {
// setCurrentSection(sectionId)   }   return (<Rect     x={x}     y={y}
// width={width}     height={height}     fill={`#${Math.floor(Math.random() *
// 10000000).toString(16)}`}     opacity={opacity}     onTouchStart={() =>
// setOpacity(0.4)}     onMouseDown={() => setOpacity(0.4)}     onTouchEnd={()
// => {     setOpacity(0)     handleClick(sectionId)   }}     onMouseUp={() => {
//     setOpacity(0)     handleClick(sectionId)   }}/>) }

const Map = (props) => {
  const {
    scale,
    stageSize,
    setStageSize,
    setCurrentSection,
    setCurrentBooth,
    enterMapMode
  } = useContext(CanvasContext);
  const {
    booths,
    diagramData,
    rowData,
    updateBooth,
    rowsOfBooths,
    pullMapDataFromFirestore
  } = useContext(BoothContext);
  const treeCircles = treeData.map(tree =>< Circle x = {
    tree.x
  }
  y = {
    tree.y
  }
  radius = {
    tree.size / 2
  }
  fill = "rgba(35, 150, 10, .7)" />)
  const [mapMode, setMapMode] = useState(false)
  // const [mapImage] = useImage("https://liveshameless.com/map.jpg");
  const [rowGroups, setRowGroups] = useState([])
  const colors = {
    green: "#799C8A",
    red: "#EA7C7C",
    yellow: "#FBBC05",
    blue: "#4E92F9"
  }
  
  const {setShowInfo, containerWidth, setModalOptions, showTrees} = props
  const buildRows = () => {
    const arrayOfRows = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R'
    ].map(rowId =>< Row key = {
      rowId
    }
    setCurrentBooth = {setCurrentBooth} 
    rowId = {rowId}
    rowDatum = {rowData[rowId]}
    sectionId = {0}
    setMapMode = {setMapMode}
    booths = {booths} />)
    setRowGroups(arrayOfRows)
  }

  useEffect(() => {
    buildRows()
    enterMapMode()
  }, [])

  return (
    <SuperStage
      containerWidth={containerWidth}
      width={1024}
      height={1083}
      scale={scale}>
      <BlankMapPathLayer/>
      {showTrees ? 
      <Layer globalCompositeOperation="lighten">
        <Group width={1024} height={1083} x={40} y={215}>{treeCircles}</Group>
      </Layer> : null}
      <SuperLayer x={0} y={0}>
        {rowGroups}
      </SuperLayer>
      {/* <Layer>
        <Group x={50} y={900} onClick={() => setShowInfo((prev => !prev))}>
          <Rect
            fill="palegoldenrod"
            width={150}
            height={75}
            shadowColor='black'
            shadowBlur={10}
            shadowOffset={{
            x: 10,
            y: 10
          }}
            shadowOpacity={0.5}/>
          <Text
            text="info"
            width={150}
            height={75}
            align="center"
            verticalAlign="middle"

            fontSize={48}/>
        </Group>
      </Layer> */}
    </SuperStage>

  );
};

export default Map;

//<Image image={mapImage} width={1024} height={1083}  />