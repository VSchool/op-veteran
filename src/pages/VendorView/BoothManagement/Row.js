import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {Stage, Layer, Rect, Text, Group} from 'react-konva'
import {CanvasContext} from '../../../context/CanvasProvider'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import {BoothContext} from '../../../context/BoothProvider'
import Booth from './Booth'
import Map from './Map'
import firestore from '../../../database'
const letters =["A", "B", "C", "D"]

const Row = (props) => {
  const [boothObjects,
    setBoothObjects] = useState([])
  
  const {sectionId, rowId, setCurrentBooth, index, stageSize,booths} = props
  useEffect(() => {
    const filtered = booths.filter(b =>(b.section === sectionId && b.row === rowId))
    filtered.sort((a, b) => a.number - b.number)
    setBoothObjects(filtered)
  }, [])
  
  return (
    
    <Group
      width={200}
      //height={1750}
      x={ letters.indexOf(rowId) * 200}
      y={0}>
          <Text 
          text={rowId}
          fontSize={64}
          align="center"
          x={0} y={0}
          width={150}
          />
      {boothObjects.map(booth =>< Booth key={booth.id} setCurrentBooth={setCurrentBooth} data = {
        booth
      }/>)}
    </Group>

  )
}

export default Row