import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {
  Stage,
  Layer,
  Rect,
  Text,
  Group,
  Path
} from 'react-konva'
import {CanvasContext} from '../../../../context/CanvasProvider'
import {UserContext} from '../../../../context/UserProvider'
import {VendorContext} from '../../../../context/VendorProvider'
import {BoothContext} from '../../../../context/BoothProvider'


const colors = {
  green: "#799C8A",
  red: "#EA7C7C",
  yellow: "#FBBC05",
  blue: "#4E92F9"
}
const Booth = (props) => {
  const {data, mapMode, setMapMode, updateBoothObjects} = props
  const {
    hasElectricity,
    restriction,
    name,
    id,
    vendor,
    number,
    section
  } = data
  

  const handleClick=()=>{
    setMapMode(!mapMode)}
  
  return (
    <Group width={mapMode ? 19 : 72} height={mapMode ? 19 : 72} x={0} y={mapMode ? (number * 19) : (number *72)}>
      <Rect
        width={mapMode ? 19 : 68}
        height={mapMode ? 19 : 68}
        x={mapMode ? 0 : 2}
        y={mapMode ? 0 : 2}
        fill={restriction === 1
        ? colors.red
        : restriction === 2
          ? colors.blue
          : colors.green}
        cornerRadius={2}/> 
        {!hasElectricity ? null : 
        mapMode ?
        <Path
            x={3}
            y={0}
            width={13}
            height={19}
            data="M9.2,3.6l0-3.6H7.3v3.6H3.7V0H1.8v3.6h0C0.9,3.5,0,4.4,0,5.3v4.9l3.2,3.1V16h4.6v-2.7l3.2-3.1V5.3
            C11,4.4,10.1,3.5,9.2,3.6z"
            fill={colors.yellow}/> :
        <Path
      x={15}
            y={5}
            width={42}
            height={62}
            data="M34.8,13.8l0-13.8h-7v13.8h-14V0h-7v13.8h0c-3.5,0-7,3.4-7,6.9v18.9L12,51.7V62h17.5V51.7l12.2-12.1V20.6
            C41.7,17.2,38.2,13.7,34.8,13.8z"
            fill={colors.yellow}/>
        }
      <Rect width={mapMode ? 19 : 72} stroke="black" height={mapMode ? 19 : 72} x={0} y={0} fill="rgba(100,100,100,0)" onClick={handleClick}/>

    </Group>
  )
}

export default Booth