import { useContext } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthProvider'
import UserProvider, { UserContext } from './context/UserProvider'
import VendorProvider, { VendorContext } from './context/VendorProvider'
import CartProvider from './context/CartProvider'
import BoothProvider from './context/BoothProvider'
import SponsorshipSelection from './pages/VendorView/SponsorshipSelection/SponsorshipSelection'
import Finalize from './pages/VendorView/Finalize'

import CanvasProvider from './context/CanvasProvider'
import { Landing, Vendor, Admin, Playground } from './pages'
import RegisterAccount from './pages/RegisterAccount'
import RegistrationForm from './pages/VendorView/RegistrationForm/RegistrationForm'
import { BoothManagement } from './pages/VendorView/BoothManagement'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer.js'
import Home from './pages/VendorView/Home'

const AppContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background-color: #ecf0f1;
  //																				 display: grid;
  //grid-template-rows: 88px 1fr;

  //   height: 3040px;
  //position: relative;
  //   border: 1px solid lightcoral;
`

/*
if not auth
*/

export default function App() {
  const { auth } = useContext(AuthContext)
  // console.log("App.js auth log: ", auth)
  if (!auth) {
    return (
      <AppContainer>
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </AppContainer>
    )
  }
  return (
    <BoothProvider>
      <UserProvider>
        <VendorProvider>
          <CartProvider>
            <CanvasProvider>
              <CanvasProvider>
                <AppContainer>
                  <UserViews />
                </AppContainer>
              </CanvasProvider>
            </CanvasProvider>
          </CartProvider>
        </VendorProvider>
      </UserProvider>
    </BoothProvider>
  )
}

function UserViews() {
  const { user, isAdmin, isDev } = useContext(UserContext)

  if (!user) {
    return <h1>Loading...</h1>
  } else if (isAdmin) {
    return <Admin />
  } else if (!isDev) {
    return (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<RegistrationForm />} />
          {/* <Route path='/registration' element={<RegisterAccount />} /> */}
          <Route path='/sponsorship' element={<SponsorshipSelection />} />
          <Route path='/booth-selection' element={<BoothManagement />} />
          <Route path='/finalize' element={<Finalize />} />
        </Routes>
        <Footer />
      </>
    )
  }
}
