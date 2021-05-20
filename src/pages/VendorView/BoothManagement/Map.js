import React, { useState, useContext } from "react";
import { CanvasContext } from "../../../context/CanvasProvider";
import { Stage, Layer, Group, Image, Rect } from "react-konva";
import useImage from "use-image";

const Map = (props) => {
  const { scale, stageSize, setCurrentSection } = useContext(CanvasContext);
  const [mapImage] = useImage("https://liveshameless.com/map.jpg");
const setAlpha=()=>{
  console.log("setAlpha")
  setCurrentSection("Alpha")
  debugger
}
  return (
    <Stage width={stageSize.w} height={stageSize.h} scale={scale}>
      <Layer x={0} y={0}>
        <Image image={mapImage} width={1024} height={1083} />
      </Layer>
      <Layer x={0} y={0}>
        <Rect x={112} y={420} width={245} height={167} rotation={-20}  fill="black" onClick={setAlpha}/>
      </Layer>
    </Stage>
  );
};

export default Map;
