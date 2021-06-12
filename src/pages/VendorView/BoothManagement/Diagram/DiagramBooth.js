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
const DiagramBooth = (props) => {
  const {data, mapMode, setMapMode, updateBoothObjects, setCurrentBooth} = props
  const {
    hasElectricity,
    restriction,
    name,
    id,
    vendor,
    number,
    section,
    row
  } = data
  


  return (
    <Group width={72} height={72} x={0} y={(number *72)}>
      <Rect
        width={68}
        height={68}
        x={2}
        y={2}
        fill={restriction === 1
        ? colors.red
        : restriction === 2
          ? colors.blue
          : colors.green}
        cornerRadius={2}/> 
        {!hasElectricity ? null :
        <Path x={15}
            y={5}
            width={42}
            height={62}
            data="M34.8,13.8l0-13.8h-7v13.8h-14V0h-7v13.8h0c-3.5,0-7,3.4-7,6.9v18.9L12,51.7V62h17.5V51.7l12.2-12.1V20.6
            C41.7,17.2,38.2,13.7,34.8,13.8z"
            fill={colors.yellow}/>
        }
      <Rect width={72} stroke="black" height={72} x={0} y={0} fill="rgba(100,100,100,0)" onClick={()=>{setCurrentBooth(id)}}/>

    </Group>
  )
}

export default DiagramBooth