import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { Header } from '../../components/Header'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import SponsorshipSelection from './SponsorshipSelection/SponsorshipSelection'
import {UserContext} from '../../context/UserProvider'
import {VendorContext} from '../../context/VendorProvider'
import { BoothManagement } from '../VendorView/BoothManagement'
import CanvasProvider from '../../context/CanvasProvider'
import Home from './Home'

const VendorPageContainer = styled.div`
    box-sizing: border-box;
   width: clamp(300px, 600px);
    height: 100%;
    margin: auto;
    padding: 10px 20px;
    //position: relative;
    // border: 2px solid dodgerblue;
`

export default function Vendor() {
    const {user} = useContext(UserContext)
    const {vendor, matchVendor} = useContext(VendorContext)
    const states = {
        HOME: "home",
        REGISTER: "register",
        SPONSOR: "sponsor",
        SELECT: "select",
        FINALIZE: "finalize",
      
    }
    const [state, setState] = useState(states.HOME)
    const [showSponsorship, setShowSponsorship] = useState(false)
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
            {state == states.HOME ? 
                <Home changeState={changeState} states={states}/> :
            state == states.REGISTER ?
                <RegistrationForm setShowSponsorship={setShowSponsorship} changeState={changeState} states={states} /> :
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
