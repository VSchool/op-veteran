import React, {useState, useContext} from 'react'
import {Rect, Group, Text} from 'react-konva'
import {CanvasContext} from '../../../../context/CanvasProvider'
import {BoothContext} from '../../../../context/BoothProvider'
import Booth from './Booth'
const sectionNames = ["Alpha", "Beta", "Gama", "Delta", "Epsilon"]
const rowNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
const Section = (props) => {
const {boothArray,stageSize, name} = props
const boothComponents = boothArray.map(booth=><Booth key={booth.id} data={booth} />)
}
export default Section