import {useContext} from "react";
import styled from 'styled-components'
import {Switch, Route} from 'react-router-dom'
import {AuthContext} from "./context/AuthProvider";
import UserProvider, {UserContext} from "./context/UserProvider";
import VendorProvider, {VendorContext} from "./context/VendorProvider";
import BoothProvider from "./context/BoothProvider";
import SponsorshipSelection from "./pages/VendorView/SponsorshipSelection/SponsorshipSelection";
import Finalize from "./pages/VendorView/Finalize";

import CanvasProvider from "./context/CanvasProvider";
import {Landing, Vendor, Admin, Playground} from './pages'
import RegisterAccount from './pages/RegisterAccount'
import RegistrationForm from './pages/VendorView/RegistrationForm/RegistrationForm'
import { BoothManagement } from "./pages/VendorView/BoothManagement";


const AppContainer = styled.div `
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
  const {auth } = useContext(AuthContext);
  // console.log("App.js auth log: ", auth)
  if (!auth) {
    return (
      <AppContainer>
        <Landing/>
      </AppContainer>
    );
  }
  return (
    <BoothProvider>
      <UserProvider>
        <VendorProvider>
          <CanvasProvider>
          <CanvasProvider>
            <AppContainer>
              <UserViews/>
            </AppContainer>
            </CanvasProvider>
          </CanvasProvider>
        </VendorProvider>
      </UserProvider>
    </BoothProvider>
  );
}

function UserViews() {
  const {user, isAdmin, isDev} = useContext(UserContext);

  if (!user) {
    return <h1>Loading...</h1>;
  } else if (isAdmin) {
    return <Admin/>
  } else if (!isDev) {
    return <Vendor/>
  }
  return (
    <Switch>
      <Route exact path='/'>
        <Landing/>
      </Route>
      <Route path="/register">
        <RegisterAccount/>
      </Route>
      <Route path='/vendor'>
        <Vendor/>
      </Route>

      <Route path='/registration'>
        <RegistrationForm />
      </Route>
      <Route path='/booth'>
        <BoothManagement />
      </Route>
      <Route path ='/sponsorship'>
        <SponsorshipSelection />
      </Route>
      <Route path='/finalize'>
        <Finalize />
      </Route>


      <Route path='/admin'>
        <Admin/>
      </Route>

      <Route path='/playground'>
        <Playground/>
      </Route>
    </Switch>
  )
}