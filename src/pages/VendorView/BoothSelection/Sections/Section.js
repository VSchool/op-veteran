import React, {useState} from 'react'
import {Rect, Group, Text} from 'react-konva'
import Konva from 'konva'
import Row from './Row'

const Section = (props)=>{
    const {data, setLevel} = props
    const {rows, name} = data
    const rowObjects = rows.map((row, i)=><Row key={i} index={i} data={row}/>)
    return (
        <Group>
            {rowObjects}
        </Group>
    )}

export default Section