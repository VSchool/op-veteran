import { useContext } from "react";
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { AuthContext } from "./context/AuthProvider";
import UserProvider from "./context/UserProvider";
// import Playground from './Playground'
import { Landing, Vendor, Admin, Playground } from './pages'


const AppContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  position: relative;
  // border: 1px solid lightcoral;
`

export default function App() {
	const { auth } = useContext(AuthContext);
	
	if (!auth) {
		return (
			<AppContainer>
				<Landing />
			</AppContainer>
		);
	}
  return (
    <AppContainer>
      <UserProvider>
		<Switch>
			<Route exact path='/'>
			<Landing />
			</Route>

			<Route path='/vendor'>
			<Vendor />
			</Route>

			<Route path='/admin'>
			<Admin />
			</Route>

			<Route path='/playground'>
			<Playground />
			</Route>
		</Switch>
	</UserProvider>
    </AppContainer>
  )
}