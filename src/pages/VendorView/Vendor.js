import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {Header} from '../../components/Header'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import SponsorshipSelection from './SponsorshipSelection/SponsorshipSelection'
import {UserContext} from '../../context/UserProvider'
import {VendorContext} from '../../context/VendorProvider'
import {BoothManagement} from '../VendorView/BoothManagement'
import CanvasProvider from '../../context/CanvasProvider'
import Home from './Home'
import Finalize from './Finalize'

const VendorPageContainer = styled.div `
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 0;
    //position: relative;
    // border: 2px solid dodgerblue;
`

export default function Vendor() {
  const {user} = useContext(UserContext)
  const {vendor, matchVendor} = useContext(VendorContext)
  const states = {
    HOME: 0,
    REGISTER: 1,
    SPONSOR: 2,
    SELECT: 3,
    FINALIZE: 4
  }
  const [state,
    setState] = useState(states.HOME)
  const [showSponsorship,
    setShowSponsorship] = useState(false)
  const changeState = newState => {
    if (newState) {
      setState(newState)
    } else {
      throw new Error(`${newState} is not a valid state`)
    }
  }

  //   if (state === states.HOME) {     page = <Home changeState={changeState}
  // states={states}/>   } else if (state === states.REGISTER) {     page =
  // <RegistrationForm       setShowSponsorship={setShowSponsorship}
  // changeState={changeState}       states={states}/>   } else if (state ===
  // states.SPONSOR) {     page = <SponsorshipSelection changeState={changeState}
  // states={states}/>   } else if (state === state.SELECT) {     page =
  // <BoothManagement states={states} changeState={changeState}/>   } else if
  // (state === states.FINALIZE) {     page = <Finalize/>


return (
  <VendorPageContainer>
    <Header/> {state === states.HOME
      ? <Home changeState={changeState} states={states}/>
      : state === states.REGISTER
        ? <RegistrationForm
            setShowSponsorship={setShowSponsorship}
            changeState={changeState}
            states={states}/>
        : state === states.SPONSOR
          ? <SponsorshipSelection changeState={changeState} states={states}/>
          : state === states.SELECT
            ? <BoothManagement states={states} changeState={changeState}/>
            : <Finalize/>
              }

  </VendorPageContainer>
)
}