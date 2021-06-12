import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {Stage, Layer, Rect, Text, Group} from 'react-konva'
import {CanvasContext} from '../../../../context/CanvasProvider'
import {UserContext} from '../../../../context/UserProvider'
import {VendorContext} from '../../../../context/VendorProvider'
import {BoothContext} from '../../../../context/BoothProvider'
import DiagramBooth from './DiagramBooth'

import firestore from '../../../../database'

const DiagramRow = (props) => {
  const [boothObjects,
    setBoothObjects] = useState([])
  const {
    rowId,
    sectionId,
    rowDatum,
    booths,
    mapMode,
    setMapMode
  } = props
  const {x, y, theta} = rowDatum
 

   
  useEffect(() => {
    const filtered = mapMode ? booths.filter(b => (b.row == rowId)) :
    booths.filter(b => (b.row == rowId && b.section == sectionId))
    filtered.sort((a, b) => a.number - b.number)
    const comps = filtered.map(b =>< DiagramBooth key={b.id} data = {
      b
    }
    key = {
      b.id
    }
    setMapMode = {
      setMapMode
    }
    mapMode = {
      mapMode
    } />)
    setBoothObjects(comps)
  }, [mapMode])
  const colors = {
    green: "#799C8A",
    red: "#EA7C7C",
    yellow: "#FBBC05",
    blue: "#4E92F9"
  }

  return (

    <Group x={x} y={y} rotation={theta} onClick={() => console.log(rowId)}>
      {boothObjects}
    </Group>

  )
}

export default DiagramRow