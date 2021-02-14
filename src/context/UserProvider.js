import { createContext, useContext, useEffect, useRef, useState } from "react";
import { firestore, createNewUser } from "../Firestore";
import { AuthContext } from "./AuthProvider";

export const UserContext = createContext();

const userRef = null;

export default function({children}) {
	const { auth } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	
	useEffect(() => {
		userRef = firestore.doc(`Users/${auth.email}`);
		const unsub = userRef.onSnapshot(doc => {
			if (!doc.exists) {
				createNewUser(auth);
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