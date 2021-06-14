import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import UserProvider from "../context/UserProvider";
import TestLogin from "./TestLogin";
import TestUserView from "./TestUserView";

export default function TestApp() {
	const { auth } = useContext(AuthContext);
	
	if (!auth) {
		return <TestLogin />
	}
	return (
		<UserProvider>
			<TestUserView />
		</UserProvider>
	);
}