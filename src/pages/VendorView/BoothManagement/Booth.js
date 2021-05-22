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
import {CanvasContext} from '../../../context/CanvasProvider'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import {BoothContext} from '../../../context/BoothProvider'

const colors = {
  green: "#799C8A",
  red: "#EA7C7C",
  yellow: "#FBBC05",
  blue: "#4E92F9"
}
const Booth = (props) => {
  const {data, size} = props
  const {
    food,
    hasElectricity,
    restriction,
    name,
    id,
    vendor,
    number
  } = data

  const handleClick=()=>{console.log(id)}
  return (
    <Group width={150} height={150} x={0} y={150 * (number-1)+64}>
      <Rect
        width={100}
        height={100}
        x={25}
        y={25}
        fill={restriction === "paladin"
        ? colors.red
        : restriction === "abrams"
          ? colors.blue
          : colors.green}
        cornerRadius={8}/> 
        {hasElectricity
        ? <Path
            x={(150 - 66) / 2}
            y={25}
            width={66}
            height={100}
            data="M55.6,22.2L55.6,0H44.4v22.2H22.2V0H11.1v22.2h-0.1C5.6,22.2,0,27.7,0,33.3v30.5l19.4,19.6V100h27.8V83.3
            l19.4-19.5V33.3C66.7,27.7,61.1,22.2,55.6,22.2z"
            fill={colors.yellow}/>
        : null}
      <Rect width={200} height={200} x={0} y={0} fill="rgba(100,100,100,0)" onClick={handleClick}/>

    </Group>
  )
}

export default Booth