import { useContext } from "react";
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { AuthContext } from "./context/AuthProvider";
import UserProvider, { UserContext } from "./context/UserProvider";
// import BoothProvider from "./context/BoothProvider";
// import Playground from './Playground'
import { Landing, Vendor, Admin, Playground } from './pages'
import { DEV_ROUTES } from "./constants";

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
	if (!DEV_ROUTES && auth) {
		 return (
			<UserProvider>
				<AppContainer>
					<UserViews />
				</AppContainer>
			</UserProvider>
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

function UserViews() {
	const { user } = useContext(UserContext);
	
	if (!user) {
		return <h1>Loading...</h1>;
	} else if (user.isAdmin) {
		return <Admin />;
	}
	return <Vendor />;
}