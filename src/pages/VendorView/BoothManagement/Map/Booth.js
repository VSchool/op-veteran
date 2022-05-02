import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import { Stage, Layer, Rect, Text, Group, Path } from 'react-konva'
import { CanvasContext } from '../../../../context/CanvasProvider'
import { UserContext } from '../../../../context/UserProvider'
import { VendorContext } from '../../../../context/VendorProvider'
import { BoothContext } from '../../../../context/BoothProvider'

const colors = {
  green: '#799C8A',
  red: '#EA7C7C',
  yellow: '#FBBC05',
  blue: '#4E92F9',
  grey: '#ecf0f1',
  white: '#def',
}
const Booth = (props) => {
  const {
    data,
    mapMode,
    setMapMode,
    updateBoothObjects,
    setCurrentBooth,
    size,
  } = props
  const {
    hasElectricity,
    restriction,
    name,
    vendor,
    number,
    section,
    row,
    status,
  } = data

  const handleClick = () => {
    let id = row
    if (number < 10) {
      id += '0'
    }
    id += number
    console.log(`setting current booth to ${id}`)
    // sets the current booth in the CanvasProvider which triggers the BoothCard modal
    setCurrentBooth(id)
  }

  return (
    <Group
      width={size ? size : 19}
      height={size ? size : 19}
      x={0}
      y={
        size
          ? size * number + Math.floor((number - 1) / 7) * 24
          : number * 19 + Math.floor((number - 1) / 7) * 24
      }
      onClick={() => {
        handleClick()
      }}
    >
      <Rect
        width={size ? size : 19}
        height={size ? size : 19}
        x={0}
        y={0}
        fill={
          status === 2
            ? colors.white
            : status === 1
            ? colors.grey
            : restriction === 1
            ? colors.red
            : restriction === 2
            ? colors.blue
            : colors.green
        }
        cornerRadius={2}
      />
      {!hasElectricity ? null : (
        <Path
          x={3}
          y={0}
          width={13}
          height={19}
          data='M9.2,3.6l0-3.6H7.3v3.6H3.7V0H1.8v3.6h0C0.9,3.5,0,4.4,0,5.3v4.9l3.2,3.1V16h4.6v-2.7l3.2-3.1V5.3
            C11,4.4,10.1,3.5,9.2,3.6z'
          fill={colors.yellow}
        />
      )}
      <Rect
        width={size ? size : 19}
        height={size ? size : 19}
        stroke='black'
        x={0}
        y={0}
        fill='rgba(100,100,100,0)'
      />
    </Group>
  )
}

export default Booth
