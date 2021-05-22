import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "../database";
import Konva from 'konva'

// import vendorData from "../testing/vendors.json";

export const CanvasContext = createContext();
export default function({children}) {
    const [scale, setScale] = useState({x:1,y:1})
    const [stageSize, setStageSize] = useState({w: 1024, h: 1280})
   
    
    function fitStageIntoParentContainer() {
        let container = document.querySelector('#root');
        let containerWidth = container.offsetWidth
        let containerHeight = container.offsetHeight
        let scaleAmnt = containerWidth < containerHeight ? Math.min(Math.max(containerWidth / stageSize.w, 0), .6) :  Math.min(Math.max(containerHeight / stageSize.h, 0), .6) 
        setScale({x: scaleAmnt, y: scaleAmnt})
    }
    useEffect(() => {
        fitStageIntoParentContainer()
    }, [])
    useEffect(() => {
        window.addEventListener('resize', fitStageIntoParentContainer, {passive: true})
        return ()=> window.removeEventListener('resize', fitStageIntoParentContainer, {passive: true})
    }, [])
	const [currentSection, setCurrentSection] = useState("")
    const [currentRow, setCurrentRow] = useState("")
    const [currentBooth, setCurrentBooth] = useState("")
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
            setCurrentBooth
        }}>
			{children}
		</CanvasContext.Provider>
	);
}