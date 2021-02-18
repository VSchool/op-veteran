import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { UserContext } from "../context/UserProvider";

export default function TestUserView() {
	const { logout } = useContext(AuthContext);
	const { user } = useContext(UserContext);
	
	return (
		<div>
			<h1>{(user) ? "User doc retrieved/created" : "Retrieving/creating user doc"}</h1>
			<button onClick={logout}>Logout</button>
		</div>
	);
}