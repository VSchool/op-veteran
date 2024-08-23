import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import { initializeAuth } from './redux/authSlice'
import { setUser } from './redux/userSlice'
import SponsorshipSelection from './pages/VendorView/SponsorshipSelection/SponsorshipSelection'
import Finalize from './pages/VendorView/Finalize'
import { Landing, Admin } from './pages'
import RegistrationForm from './pages/VendorView/RegistrationForm/RegistrationForm'
import { BoothManagement } from './pages/VendorView/BoothManagement'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer.js'
import Home from './pages/VendorView/Home'
import { useEffect } from 'react'

const AppContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background-color: #ecf0f1;
`

export default function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth.auth)
  const user = useSelector((state) => state.user.user)
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const isDev = useSelector((state) => state.user.isDev)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

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
    <AppContainer>
      {user ? (
        isAdmin ? (
          <Admin />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/registration' element={<RegistrationForm />} />
              <Route path='/sponsorship' element={<SponsorshipSelection />} />
              <Route path='/booth-selection' element={<BoothManagement />} />
              <Route path='/finalize' element={<Finalize />} />
            </Routes>
            <Footer />
          </>
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </AppContainer>
  )
}
