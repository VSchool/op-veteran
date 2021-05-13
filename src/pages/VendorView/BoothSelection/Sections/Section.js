import React, {useState, useContext} from 'react'
import {Rect, Group, Text} from 'react-konva'
import {CanvasContext} from '../../../../context/CanvasProvider'
import {BoothContext} from '../../../../context/BoothProvider'
import Row from './Row'
const sectionNames = ["Alpha", "Beta", "Gama", "Delta", "Epsilon"]
const Section = (props) => {
  const {setCurrentRow, data,stageSize, name} = props
 // debugger
  //const {booths} = useContext(BoothContext)
  //const {stageSize, scale} = useContext(CanvasContext)
  const rowObjects = Object.keys(data).map((row, i) => {
  return (
  < Row key = {
      row
    }
    index = {
      i
    }
    name = {row}
    data= {
     data[row]
    } />)
  })
  return (
    <Group
      x={0}
      y={0}
      width={stageSize.w}
      height={stageSize.h}>
        {rowObjects}
    </Group>
  )
}

export default Section