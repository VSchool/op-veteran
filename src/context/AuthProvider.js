import { createContext, useEffect, useState } from "react";
import { auth, googleSignIn, emailSignIn, emailSignup, signOut } from "../Firebase";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
	const [auth, setAuth] = useState(null);
	const [authError, setAuthError] = useState(null);
	
	useEffect(() => {
		auth.onAuthStateChanged(user => setAuth(user));
	}, []);
	
	/* Add more suffisticated error handling later */
	const handleErrors = err => {
		console.error(err);
		setAuthError(err.message);
	}
	
	const signInWithGoogle = () => {
		setAuthError(null);
		googleSignIn(handleErrors);
	}
	
	const signInWithEmail = (email, password) => {
		setAuthError(null);
		emailSignIn(email, password, handleErrors);
	}
	
	const signUpWithEmail = (email, password) => {
		setAuthError(null);
		emailSignup(email, password, handleErrors);
	}
	
	const logout = () => {
		signOut(handleErrors);
	}
	
	return (
		<AuthContext.Provider value={{
			auth,
			authError,
			setAuthError,
			signInWithGoogle,
			signInWithEmail,
			signUpWithEmail,
			logout
		}}>
			{children}
		</AuthContext.Provider>
	);
}