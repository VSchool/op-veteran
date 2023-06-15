// import React, { useState, useContext, useEffect } from 'react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Konva from 'konva'
// import { Stage, Layer, Rect, Text, Group } from 'react-konva'
import {  Group } from 'react-konva'
// import { CanvasContext } from '../../../../context/CanvasProvider'
// import { UserContext } from '../../../../context/UserProvider'
// import { VendorContext } from '../../../../context/VendorProvider'
// import { BoothContext } from '../../../../context/BoothProvider'
import Booth from './Booth'
// import Map from './Map'
// import firestore from '../../../../database'

const Row = (props) => {
  const [boothObjects, setBoothObjects] = useState([])
  const {
    rowId,
    // sectionId,
    rowDatum,
    booths,
    // mapMode,
    // setMapMode,
    setCurrentBooth,
    getBooths,
  } = props
  const { x, y, theta } = rowDatum

  useEffect(() => {
    const filtered = booths.filter((b) => b.row === rowId)
    filtered.sort((a, b) => a.number - b.number)
    const comps = filtered.map((b) => (
      <Booth
        setCurrentBooth={setCurrentBooth}
        size={19}
        data={b}
        key={`${b.row}${b.number}`}
      />
    ))
    setBoothObjects(comps)
    if (booths.length === 0) {
      getBooths()
      console.log(booths)
    }
  }, [booths, rowId, setCurrentBooth]) //COMMENT:  React Hook useEffect has a missing dependency: 'getBooths'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

  return (
    <Group x={x} y={y} rotation={theta}>
      {boothObjects}
    </Group>
  )
}

export default Row
