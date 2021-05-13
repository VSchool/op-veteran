import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "../database";
import Konva from 'konva'

// import vendorData from "../testing/vendors.json";

export const CanvasContext = createContext();
export default function({children}) {
    const [scale, setScale] = useState({x:1,y:1})
    const [stageSize, setStageSize] = useState({w: 1024, h: 2048})
    const modes = {
        SQUARE: 0,
        TALLL:1,
        WIDE: 2,
        OVERFLOW_X: 3
    }
    const [mode, setMode] = useState(modes.TALL)
    
    function fitStageIntoParentContainer() {
        let container = document.querySelector('#root');
        let containerWidth = container.offsetWidth
        let containerHeight = container.offsetHeight
        let scaleAmnt = mode === modes.WIDE ? Math.min(Math.max(containerHeight / stageSize.h, 0), 2) : Math.min(Math.max(containerWidth / stageSize.w, 0), 2)
        setScale({x: scaleAmnt, y: scaleAmnt})
    }
    function changeMode(newMode){
        switch (newMode) {
            case modes.SQUARE:
                setStageSize({
                    w: 1024,
                    h: 1024
                })
                break
            case modes.TALLL:
                setStageSize({
                    w: 1024,
                    h: 2048
                })
                break
            case modes.WIDE:
                setStageSize({
                    w: 2048, 
                    h: 1024
                })
                break
            case modes.OVERFLOW_X: 
                setStageSize({
                    w: 512, 
                    h: 1024
                })
        }
        fitStageIntoParentContainer()
    }
	const [currentSection, setCurrentSection] = useState("Alpha")
    const [currentRow, setCurrentRow] = useState("All Rows")
	return (
		<CanvasContext.Provider value={{
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
        }}>
			{children}
		</CanvasContext.Provider>
	);
}