import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Konva from 'konva'
import {Stage, Layer, Rect, Text} from 'react-konva'
import {CanvasContext} from '../../../context/CanvasProvider'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import {BoothContext} from '../../../context/BoothProvider'
import Row from "./Row";


const Section = (props)=>{
    const {sectionId} = props
    const [rowIds,
        setRowIds] = useState([])
    const {user} = useContext(UserContext)
    const {vendor, updateCurrentVendor} = useContext(VendorContext)
    const {
      scale,
      setScale,
      stageSize,
      setStageSize,
      modes,
      changeMode,
      fitStageIntoParentContainer,
      currentSection,
      setCurrentSection,
      currentRow,
      setCurrentRow
    } = useContext(CanvasContext)
    const {booths} = useContext(BoothContext) 
    useEffect(() => {
        debugger
        const filtered = booths.filter(b =>(b.section === sectionId))
        filtered.sort((a, b) => a.row - b.row)
        const ids = filtered.reduce((final, booth)=>{
            final.push(booth.row)
            return final
        }, [])
        setRowIds(ids)
      }, [])
    return (
<Stage width={stageSize.w} height={stageSize.h} scale={scale}>
<Layer>
  {rowIds.map((id, index)=><Row key={index} sectionId={sectionId} rowId={id} index={index} stageSize={stageSize} booths={booths}/>)}
</Layer>
</Stage>
    )
}

export default Section 