import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Header } from '../../components/Header'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import SponsorshipSelection from './SponsorshipSelection/SponsorshipSelection'
import { UserContext } from '../../context/UserProvider'
import { VendorContext } from '../../context/VendorProvider'
import { BoothManagement } from '../VendorView/BoothManagement'
import CanvasProvider from '../../context/CanvasProvider'
import Home from './Home'
import Finalize from './Finalize'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterAccount from '../RegisterAccount'

const VendorPageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0;
  //position: relative;
  // border: 2px solid dodgerblue;
`

export default function Vendor() {
  const { user } = useContext(UserContext)
  const { vendor, matchVendor } = useContext(VendorContext)

  //   if (state === states.HOME) {     page = <Home changeState={changeState}
  // states={states}/>   } else if (state === states.REGISTER) {     page =
  // <RegistrationForm       setShowSponsorship={setShowSponsorship}
  // changeState={changeState}       states={states}/>   } else if (state ===
  // states.SPONSOR) {     page = <SponsorshipSelection changeState={changeState}
  // states={states}/>   } else if (state === state.SELECT) {     page =
  // <BoothManagement states={states} changeState={changeState}/>   } else if
  // (state === states.FINALIZE) {     page = <Finalize/>

  return <></>
}

// eslint-disable-next-line no-lone-blocks
{
  /* <BrowserRouter>
  <Routes>
    <Route exact path='/'>
      <Landing />
    </Route>
    <Route path='/register'>
      <RegisterAccount />
    </Route>
    <Route path='/vendor'>
      <Vendor />
    </Route>

    <Route path='/registration'>
      <RegistrationForm />
    </Route>
    <Route path='/booth'>
      <BoothManagement />
    </Route>
    <Route path='/sponsorship'>
      <SponsorshipSelection />
    </Route>
    <Route path='/finalize'>
      <Finalize />
    </Route>

    <Route path='/admin'>
      <Admin />
    </Route>

    <Route path='/playground'>
      <Playground />
    </Route>
  </Routes>
</BrowserRouter>; */
}
