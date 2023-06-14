import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import { Stage, Layer, Rect, Text, Group } from 'react-konva'
import { CanvasContext } from '../../../../context/CanvasProvider'
import { UserContext } from '../../../../context/UserProvider'
import { VendorContext } from '../../../../context/VendorProvider'
import { BoothContext } from '../../../../context/BoothProvider'
import DiagramBooth from './DiagramBooth'

import firestore from '../../../../database'

const DiagramRow = (props) => {
  const [boothObjects, setBoothObjects] = useState([])
  const { rowId, sectionId, rowDatum, booths, mapMode, setMapMode } = props
  const { x, y, theta } = rowDatum

  useEffect(() => {
    const filtered = booths.filter(
      (b) => b.row == rowId && b.section == sectionId
    )
    filtered.sort((a, b) => a.number - b.number)
    const comps = filtered.map((b) => (
      <DiagramBooth key={b.id} data={b}/>
      // <DiagramBooth key={b.id} data={b} key={b.id} /> replaced with line right above b/c of duplicate
    ))
    setBoothObjects(comps)
  }, [])

  return (
    <Group x={x} y={y} rotation={theta}>
      {boothObjects}
    </Group>
  )
}

export default DiagramRow
