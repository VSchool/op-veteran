import React, { useState, useContext, useEffect } from 'react'
import { CanvasContext } from '../../../../context/CanvasProvider'
import { BoothContext } from '../../../../context/BoothProvider'
// import { Stage, Layer, Group, Image, Rect, Path } from 'react-konva'
import { Stage, Layer } from 'react-konva'
// import useImage from 'use-image'
import styled from 'styled-components'
import DiagramRow from './DiagramRow'

const SuperStage = styled(Stage)`
  border: 3px solid black;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
`
// const StageWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;
// `

const Diagram = (props) => {
  // const { scale, stageSize, setStageSize, setCurrentSection, setCurrentBooth } =
  //   useContext(CanvasContext)
  const { scale, setCurrentBooth } = useContext(CanvasContext)

  const {
    booths,
    diagramData,
    // rowData,
    // rowsOfBooths,
    // pullMapDataFromFirestore,
  } = useContext(BoothContext)
  //const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  // const [mapImage] = useImage("https://liveshameless.com/map.jpg");
  const [rowGroups, setRowGroups] = useState([])
  // const colors = {
  //   green: '#799C8A',
  //   red: '#EA7C7C',
  //   yellow: '#FBBC05',
  //   blue: '#4E92F9',
  // }
  const buildRows = () => {
    let arrayOfRows = []
    for (let i = 1; i < 8; i++) {
      let section = `section${i}`
      console.log(diagramData[section])
      const rowLetters = [
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
      ]
      for (let j = 0; j < rowLetters.length; j++) {
        let rowId = rowLetters[j]
        if (diagramData[section][rowId]) {
          arrayOfRows.push(
            <DiagramRow
              setCurrentBooth={setCurrentBooth}
              rowDatum={diagramData[section][rowId]}
              rowId={rowId}
              sectionId={i}
              booths={booths}
              key={`${section}${rowId}`}
            />
          )
        }
      }
      setRowGroups(arrayOfRows)
    }
  }
  useEffect(() => {
    buildRows()
    // const rgroup = rowsOfBooths.A.map(b=><Rect x={0} y={b.number*20} width={20}
    // height={20} fill={colors.green} stroke="#000" strokeWidth={1}/>)
    // setRowGroups(prev=>[...prev, rgroup])
  }, []) //COMMENT:  React Hook useEffect has a missing dependency: 'buildRows'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

  return (
    <SuperStage width={700} height={700} scale={scale}>
      <Layer
        width={1400}
        height={2800}
        //x={xOffset}
        y={yOffset}
        onClick={() => setYOffset((prev) => prev - 800)}
      >
        {rowGroups}
      </Layer>
    </SuperStage>
  )
}

export default Diagram

//<Image image={mapImage} width={1024} height={1083}  />
