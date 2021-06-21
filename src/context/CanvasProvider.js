import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "../database";
import Konva from 'konva'

// import vendorData from "../testing/vendors.json";

export const CanvasContext = createContext();
export default function({children}) {
    const [scale, setScale] = useState({x:1,y:1})
    const [stageSize, setStageSize] = useState({w: 1024 , h: 1083 })
    const [currentSection, setCurrentSection] = useState("")
    const [currentRow, setCurrentRow] = useState("")
    const [currentBooth, setCurrentBooth] = useState(null)
    const enterDiagramMode = () =>{
        setStageSize({w: 700, h: 700})
        fitStageIntoParentContainer(2)
    }
    const enterMapMode = () =>{
        setStageSize({w: 1024, h: 1083})
        fitStageIntoParentContainer(1)
    }
    function fitStageIntoParentContainer(mod = 1) {
        let container = document.querySelector('#root');
        let containerWidth = container.offsetWidth
        let containerHeight = container.offsetHeight
        //let scaleAmnt = containerWidth < containerHeight ? Math.min(Math.max(containerWidth / stageSize.w, 0), 1) :  Math.min(Math.max(containerHeight / stageSize.h, 0),1) 
        let scaleAmnt = Math.min(Math.max(containerWidth / stageSize.w, 0), 1)
        setScale({x: scaleAmnt, y: scaleAmnt})
        console.log(`container: ${containerWidth} | stage.w: ${stageSize.w} | scaleAmnt: ${scaleAmnt}`)
    }
    const getContainerWidth = () => {
        let container = document.querySelector('#root');
        let containerWidth = container.offsetWidth
        let containerHeight = (container.offsetHeight * .8)
        return Math.min(containerWidth, containerHeight)
         }
    
    
    useEffect(() => {
        fitStageIntoParentContainer()
    }, [])
    useEffect(() => {
        window.addEventListener('resize', fitStageIntoParentContainer, {passive: true})
        return ()=> window.removeEventListener('resize', fitStageIntoParentContainer, {passive: true})
    }, [])
	
	return (
		<CanvasContext.Provider value={{
			scale,
            setScale,
            stageSize,
            setStageSize,
            fitStageIntoParentContainer,
            currentSection,
            setCurrentSection,
            currentRow,
            setCurrentRow,
            currentBooth,
            setCurrentBooth, 
            enterDiagramMode,
            enterMapMode,
            getContainerWidth
        }}>
			{children}
		</CanvasContext.Provider>
	);
}