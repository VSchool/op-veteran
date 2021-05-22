import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { Header } from '../../components/Header'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import SponsorshipSelection from './SponsorshipSelection/SponsorshipSelection'
import {UserContext} from '../../context/UserProvider'
import {VendorContext} from '../../context/VendorProvider'
import {BoothSelection} from '../../pages/VendorView/BoothSelection'
import {Map} from '../../pages/VendorView/BoothSelection/Sections/Map'
import { BoothManagement } from '../VendorView/BoothManagement'
import CanvasProvider from '../../context/CanvasProvider'

const VendorPageContainer = styled.div`
    box-sizing: border-box;
   width: clamp(300px, 600px);
    height: 100%;
    //margin: auto;
    //position: relative;
    // border: 2px solid dodgerblue;
`

export default function Vendor() {
    const {user} = useContext(UserContext)
    const {vendor, matchVendor} = useContext(VendorContext)
    
    const states = {
        REGISTER: "register",
        SPONSOR: "sponsor",
        SELECT: "select",
        FINALIZE: "finalize",
    }
    const [state, setState] = useState(states.REGISTER)
    
    const changeState = newState=> {
        if (newState){
            setState(newState)
        }
        else {
            throw new Error(`${newState} is not a valid state`)
        }
    }
    return (
        <VendorPageContainer>
            <Header  />
            {state == states.REGISTER ?
                <RegistrationForm changeState={changeState} states={states} /> :
            state == states.SPONSOR ?
                <SponsorshipSelection changeState={changeState} states={states}/> :
            state == states.SELECT ?
            <CanvasProvider>
               <BoothManagement />
            </CanvasProvider> :
            null}
        </VendorPageContainer>
    )
}
