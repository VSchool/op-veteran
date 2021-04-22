import React, {useContext}from 'react'
import Sketch from 'react-p5'
import BoothContext from '../../context/BoothProvider'

function Map() {
  let button
  let map
  let state = null;
  const rows = [];
let rowPoints = [];
const states = {ADDROW: "add row", ADDBOOTH: "add booth", NULL: null}
function preload(p5){ 
 // map = p5.loadImage('./map.png');
}
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(300, 500).parent(canvasParentRef)
  //p5.image(map, 0,0);;l.
  button=p5.createButton("Add Row");
  button.position(25,300);
  button.mousePressed(addRow);
  }
  function makeRows(p5){
    console.log("making rows")
    for (let row of rows){
        p5.strokeWeight(4);
        p5.stroke("red");
        p5.line(row[0], row[1], row[2], row[3]);
    }
}
  function setState(newState){
    if (states[newState]){
        state = state[newState]
    }
}
  function addRow(){
    setState("ADDROW");
}
function mouseClicked(p5) {
  console.log("click");
  switch (state) {
      case states.ADDROW:
          if (p5.mouseX>=200){
          rowPoints.push(p5.mouseX);
          rowPoints.push(p5.mouseY);
          if (rowPoints.length === 4){
              rows.push([...rowPoints])
              rowPoints = [];
              setState(null);
              makeRows();
      }}
          break;
  }
}

  const draw = p5 => {
    p5.background(40, 100, 40)
  button=p5.createButton("Add Row");
   button.position(25,450);
   button.mousePressed(()=>console.log(addRow));
  }
  
  return <Sketch preload={preload} setup={setup} draw={draw} mouseClicked={mouseClicked}/>
}

export default Map

// import React from 'react'
// import Sketch from 'react-p5'
// import mapImg from './map.png'

// function Map() {
//   let map, button, mapImage;
//   let state = null;
//   const stateOptions = ["addRow", "addBooth"]
//   const rows = [];
//   let rowPoints = [];
//   function setState(newState){
//     state = stateOptions.includes(newState) ? newState : null
// }
//   function addRow(){
//     setState("addRow");
// }
//   function preload(p5){ 
//     map = p5.loadImage(mapImg);
//   }
//   const setup = (p5, canvasParentRef) => {
//     p5.createCanvas(300, 500).parent(canvasParentRef)
//     p5.noLoop()
//     p5.background(255, 130, 20)
//     p5.image(map, 200,0);
//   button=p5.createButton("Add Row");
//   button.position(25,300);
//   button.mousePressed(addRow);
//   }
  
//   const draw = p5 => {
    
//   }
  
//   return <Sketch setup={setup} draw={draw} />
// }

// export default Map