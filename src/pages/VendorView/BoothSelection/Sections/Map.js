import React, {useState, useContext, useEffect} from 'react'
import { Group, Rect, Text} from 'react-konva'
import Section from "./Section";
import styled from 'styled-components'
import {UserContext} from '../../../../context/UserProvider'
import {CanvasContext} from '../../../../context/CanvasProvider'
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const GREEKLETTERS= ["Alpha", "Beta", "Gama", "Delta", "Epsilon"]
const MapWrapper = styled(Group)`
`
const colors = {
    green: "#799C8A",
    red: "#EA7C7C",
    yellow: "#FBBC05",
    blue: "#4E92F9"
  }
const MapRow = props=>{
    const {name, data, sectionHeight} = props
    const boothSize = Math.floor(sectionHeight/8)
    const boothObjects = data.map(booth=><Rect
        key={booth.id}
        fill={booth.restriction === "paladin"
        ? colors.red
        : booth.restriction === "abrams"
          ? colors.blue
          : colors.green}
        stroke={booth.hasElectricity ? colors.yellow : null}
        strokeWidth={booth.hasElectricity ? 2 : 0}
        x={5}
        y={(booth.number%8)*boothSize+5}
        width={boothSize-10}
        height={boothSize-10}
        onClick={()=>console.log(booth.id)}
    />)
    return (
        <Group 
        x={LETTERS.indexOf(name)*boothSize}
        y={0}
        width={boothSize}
        height={sectionHeight}
        >
            <Text
                text={name}
                fontSize={28}
                align="center"
                verticalAlign="middle"
                x={0}
                y={0}
                width={boothSize}
                height={boothSize}
            />
            {boothObjects}
        </Group>
    )
}
const MapSection = props=>{
    const {order, sectionHeight, stageSize, setCurrentSection, changeMode, modes, data, name} = props
    const [isHovered, setIsHovered] = useState(false)
    const rowObjects = Object.keys(data).map(row=><MapRow key={row} sectionHeight={sectionHeight} name={row} data={data[row]}/>)
    return (

        <Group
            width={stageSize.w}
            height={sectionHeight}
            y={(sectionHeight)*(order)}
            x={0}
        >
            <Text
                width={150}
                height={sectionHeight}
                x={0}
                y={-64}
                fontSize={36}
                align="center"
                verticalAlign="middle"
                text="Section"
            />
            <Text
                width={150}
                height={sectionHeight}
                x={0}
                y={0}
                fontSize={45}
                align="center"
                verticalAlign="middle"
                text={name}
            />
            <Group
                width={stageSize.w-150}
                height={sectionHeight}
                x={150}
                y={0}   
            >
                {rowObjects}
            </Group>
        <Rect
            width={stageSize.w}
            height={sectionHeight}
            y={0}
            x={0}
            fill={isHovered ? "rgba(0,0,0,.4" : "rgba(0,0,0,0"}
            onMouseOver={(e)=>setIsHovered(prev=>true)}
            onMouseLeave={(e)=>setIsHovered(prev=>false)}
            //onClick={() => setCurrentSection("Alpha")}
        />
        </Group>
    )
} 
const Map = (props)=>{
    const {mapData, setCurrentSection, stageSize, changeMode, modes} = props
    const [sectionHeight, setSectionHeight] = useState(Math.floor(stageSize.h/5))
    const mapDataKeys = Object.keys(mapData)
    const sections = mapDataKeys.map((section, index)=><MapSection changeMode={changeMode} modes={modes} stageSize={stageSize} sectionHeight={sectionHeight} key={section} order={GREEKLETTERS.indexOf(section)} data={mapData[section]} name={section} setCurrentSection={setCurrentSection} />)
    return(
        <MapWrapper>
            {sections}
        </MapWrapper>
    )
}

export default Map