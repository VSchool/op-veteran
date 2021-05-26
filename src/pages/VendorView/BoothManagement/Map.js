import React, { useState, useContext } from "react";
import { CanvasContext } from "../../../context/CanvasProvider";
import { Stage, Layer, Group, Image, Rect } from "react-konva";
import useImage from "use-image";
import styled from 'styled-components'

const StageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const SectionSelector = (props)=>{
  const {setCurrentSection, x, y, width, height, sectionId} = props
  const [opacity, setOpacity] = useState(0)
  const handleClick=(sectionId)=>{
    setCurrentSection(sectionId)
  }
  return (
    <Rect x={x} y={y} width={width} height={height} fill={`#${Math.floor(Math.random()*10000000).toString(16)}`} opacity={opacity} onTouchStart={()=>setOpacity(0.4)} onMouseDown={()=>setOpacity(0.4)} onTouchEnd={()=>{
      setOpacity(0)
      handleClick(sectionId)}
    } onMouseUp={()=>{
      setOpacity(0)
      handleClick(sectionId)}
    }/>
  )
}

const Map = (props) => {
  const { scale, stageSize, setCurrentSection } = useContext(CanvasContext);
  const [mapImage] = useImage("https://liveshameless.com/map.jpg");


  return (
  
    <Stage width={stageSize.w} height={stageSize.h} scale={scale}>
      <Layer x={0} y={0}>
        <Image image={mapImage} width={1024} height={1083} />
      </Layer>
      <Layer x={0} y={0}>
        <Group x={112} y={420} rotation={-20}>
          <SectionSelector x={0} y={0}   width={245} height={167} sectionId={0} setCurrentSection={setCurrentSection}/>
          <SectionSelector x={0} y={167} width={245} height={167} sectionId={1} setCurrentSection={setCurrentSection}/>
          <SectionSelector x={0} y={334} width={245} height={167} sectionId={2} setCurrentSection={setCurrentSection}/>
          <SectionSelector x={0} y={501} width={245} height={167} sectionId={3} setCurrentSection={setCurrentSection}/>
        </Group>
      </Layer>
    </Stage>
  );
};

export default Map;
