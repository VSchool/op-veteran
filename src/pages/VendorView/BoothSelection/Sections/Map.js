import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {BoothContext} from '../../../../context/BoothProvider'

const MapWrapper = styled.div`

`

const Map = (props)=>{
    const {pullMapDataFromFirestore, organizeMapData} = useContext(BoothContext) 
    debugger
    useEffect(() => {
        const data = pullMapDataFromFirestore()
        const mapData = organizeMapData
        
    }, [])
    return(
<MapWrapper></MapWrapper>
    )
}

export default Map