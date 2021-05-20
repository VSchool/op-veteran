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


const Row = (props) => {
  const [boothObjects,
    setBoothObjects] = useState([])
  
  
  const {sectionId, rowId, index, stageSize,booths} = props
  useEffect(() => {
    const filtered = booths.filter(b =>(b.section === sectionId && b.row === rowId))
    filtered.sort((a, b) => a.number - b.number)
    setBoothObjects(filtered)
  }, [])
  
  return (
    
    <Group
      width={stageSize.w / boothObjects.length}
      x={index * (stageSize.w / boothObjects.length)}
      y={0}>
      {boothObjects.map(booth =>< Booth key={booth.id} data = {
        booth
      }
      size = {
        stageSize.w / boothObjects.length
      } />)}
    </Group>

  )
}

export default Row