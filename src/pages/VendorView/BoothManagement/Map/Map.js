import React, {useState, useContext, useEffect} from "react";
import {CanvasContext} from "../../../../context/CanvasProvider";
import {BoothContext} from "../../../../context/BoothProvider";
import {
  Stage,
  Layer,
  Group,
  Image,
  Rect,
  Path
} from "react-konva";
import useImage from "use-image";
import styled from 'styled-components'
import BlankMapPathLayer from './BlankMapPathLayer'
import Row from './Row'
//import rowData from './mappingData'
const SuperStage = styled(Stage)`
border: 3px black solid;
overflow: hidden;
`
const StageWrapper = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const SectionSelector = (props) => {
  const {
    setCurrentSection,
    x,
    y,
    width,
    height,
    sectionId
  } = props

  const [opacity,
    setOpacity] = useState(0)
  
    const handleClick = (sectionId) => {
    setCurrentSection(sectionId)
  }
  return (<Rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill={`#${Math.floor(Math.random() * 10000000).toString(16)}`}
    opacity={opacity}
    onTouchStart={() => setOpacity(0.4)}
    onMouseDown={() => setOpacity(0.4)}
    onTouchEnd={() => {
    setOpacity(0)
    handleClick(sectionId)
  }}
    onMouseUp={() => {
    setOpacity(0)
    handleClick(sectionId)
  }}/>)
}

const Map = (props) => {
  const {scale, stageSize, setStageSize, setCurrentSection} = useContext(CanvasContext);
  const {booths, diagramData, rowData, rowsOfBooths, pullMapDataFromFirestore} = useContext(BoothContext);
  const [mapMode, setMapMode] = useState(false)
  // const [mapImage] = useImage("https://liveshameless.com/map.jpg");
  const [rowGroups, setRowGroups] = useState([])
  const colors = {
    green: "#799C8A",
    red: "#EA7C7C",
    yellow: "#FBBC05",
    blue: "#4E92F9"
  }
  const buildRows = () => {
    let arrayOfRows
    if (mapMode){
      arrayOfRows = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N' ].map(rowId=><Row rowId={rowId} rowDatum={rowData[rowId]} mapMode={mapMode} sectionId={0} setMapMode={setMapMode} booths={booths}/>) 
    }
    else {
      arrayOfRows = []
      for (let i = 1; i < 8; i++){
        let section = `section${i}`
        console.log(diagramData[section])
        const rowLetters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N' ]
        for (let j = 0; j < rowLetters.length; j++){
          let rowId = rowLetters[j]
          if (diagramData[section][rowId]){
            arrayOfRows.push(<Row rowDatum={diagramData[section][rowId]} rowId={rowId} sectionId={i} booths={booths} mapMode={mapMode} setMapMode={setMapMode} key={`${section}${rowId}`}/>)
          }  
        }
        //     arrayOfRows.push(<Row rowDatum={diagramData[section][rowId]} rowId={rowId} sectionId={i} booths={booths} mapMode={mapMode} setMapMode={setMapMode} key={`${section}${rowId}`}/>)
          }
      }
    
    setRowGroups(arrayOfRows)
  }
  // const rowGroups = Object.keys(rowData).map(rowId=><Group key={rowId}
  // x={rowData[rowId].x} y={rowData[rowId].y}
  // rotation={rowData[rowId].theta}>{rowsOfBooths[rowId].map(b=><Rect
  // key={`${rowId}${b.number}`} width={20} height={20} x={0}
  // y={(20*(b.number-1))+(Math.floor(b.number/8)*42)} fill={(b.vendor &&
  // b.vendor.organization) ? "#999" : b.restriction === 1 ? colors.red :
  // b.restriction === 2   ? colors.blue   : colors.green}
  // stroke={b.hasElectricity ? colors.yellow : null} strokeWidth={b.hasElectricity
  // ? 1 : 0}/>)}</Group>)
  useEffect(async () => {
    await pullMapDataFromFirestore()
    buildRows()
    // const rgroup = rowsOfBooths.A.map(b=><Rect x={0} y={b.number*20} width={20}
    // height={20} fill={colors.green} stroke="#000" strokeWidth={1}/>)
    // setRowGroups(prev=>[...prev, rgroup])

  }, [mapMode])
  return (
    <SuperStage width={700 *scale.x} height={900 *scale.y}>
      {mapMode ? <BlankMapPathLayer/> : null}
      <Layer scale={scale} backround="red" width={mapMode ? 1024 : 2048} height={mapMode ? 1083: 4332} x={0} y={0}>
        { rowGroups
        }
      </Layer>
    </SuperStage>
  );
};

export default Map;

//<Image image={mapImage} width={1024} height={1083}  />