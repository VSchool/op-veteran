import React, {useState} from 'react'
import {Rect, Group, Text} from 'react-konva'
import Konva from 'konva'
import Booth from './Booth'

const Row = (props)=>{
    const {index, data} = props
    const {booths, column, name} = data
    const boothObjects = booths.map((booth, i)=><Booth key={i} index={i} data={booth}/>)
    return (
        <Group
            x={column*144}
            y={24}
        >
            <Text 
                x={16}
                align="center"
                fontSize={14}
                text={"Lane\n"+name}
            />
            {boothObjects}
        </Group>
    )}

export default Row