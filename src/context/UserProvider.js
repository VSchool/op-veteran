import { createContext, useContext, useEffect, useState } from "react";
import Firestore, { createUser } from "../Firestore";
import { AuthContext } from "./AuthProvider";

export const UserContext = createContext();

let userRef = null;

export default function({children}) {
	const { auth } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	
	useEffect(() => {
		userRef = Firestore.doc(`Users/${auth.email}`);
		const unsub = userRef.onSnapshot(doc => {
			if (!doc.exists) {
				createUser(auth);
			} else {
				setUser(doc.data());
			}
		}, err => console.error(err));
		
		return unsub;
	}, [setUser]);
	
	return (
		<UserContext.Provider value={{
			user
		}}>
			{children}
		</UserContext.Provider>
	);
}