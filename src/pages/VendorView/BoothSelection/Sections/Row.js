import React, {useState, useContext} from 'react'
import {Rect, Group, Text} from 'react-konva'
import Konva from 'konva'
import Booth from './Booth'
import {BoothContext} from '../.../../../../../context/BoothProvider'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const Row = (props)=>{
    const {index, section, name, changeLevel, data} = props
    
    const boothObjects = data.map((booth, i)=> <Booth key={booth.id} index={i} changeLevel={changeLevel} data={booth}/>)
    return (
        <Group
            x={LETTERS.indexOf(name)*250}
            y={24}
            width={250}
            
        >
            {boothObjects}
        </Group>
    )}

export default Row