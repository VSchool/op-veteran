import React, {useState, useContext} from 'react'
import {Rect, Circle, Path, Group, Text} from 'react-konva'
import Konva from 'konva'
const colors = {
  green: "#799C8A",
  red: "#EA7C7C",
  yellow: "#FBBC05",
  blue: "#4E92F9"
}
const Booth = (props) => {
  const {index, data} = props
  const {
    food,
    hasElectricity,
    restriction,
    name,
    id,
    vendor
  } = data

  return (
    <Group width={250} height={250} x={0} y={250 * index + 64}>
      <Rect
        width={150}
        height={150}
        x={50}
        y={50}
        fill={restriction === "paladin"
        ? colors.red
        : restriction === "abrams"
          ? colors.blue
          : colors.green}
        cornerRadius={8}/> {hasElectricity
        ? <Path
            x={(250 - 66) / 2}
            y={75}
            width={66}
            height={100}
            data="M55.6,22.2L55.6,0H44.4v22.2H22.2V0H11.1v22.2h-0.1C5.6,22.2,0,27.7,0,33.3v30.5l19.4,19.6V100h27.8V83.3
            l19.4-19.5V33.3C66.7,27.7,61.1,22.2,55.6,22.2z"
            fill={colors.yellow}/>
        : null}
      <Rect
        width={250}
        height={250}
        x={0}
        y={0}
        fill="rgba(100,100,100,0)"
        onClick={() => {
        console.log(name)
      }}/>
      <Text
        width={100}
        height={100}
        text={id}
        fontSize={45}
        x={0}
        y={0}
        align="center"
        verticalAlign="middle"
        fill="black"/>
    </Group>
  )
}

export default Booth
