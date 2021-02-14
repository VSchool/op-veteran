import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function TestLogin() {
	const { signInWithGoogle, signInWithEmail, signUpWithEmail, authError } = useContext(AuthContext);
	const [fields, setFields] = useState{
		email: "",
		password: ""
	});
	
	const handleChange = e => {
		const { name, value } = e.target;
		setFields(prev => ({...prev, [name]: value }));
	}
	
	const handleClick = e => {
		const { name } = e.target;
		if (name === "signup") {
			signUpWithEmail(email, password);
		} else {
			signInWithEmail(email, password);
		}
	}
	
	return (
		<form onSubmit={e => e.preventDefault()}>
		<button onClick={signInWithGoogle}>Sign In With Google</button>
		<p>OR</p>
			<label>
				Email: 
				<input type="email" name="email" value={fields.email} onChange={handleChange} required />
			</label>
			<label>
				Password: 
				<input type="password" name="password" value={fields.password} onChange={handleChange} required />
			</label>
			<button name="signup" onClick={handleClick}>Register</button>
			<button name="signin" onClick={handleclick}>Login</button>
		</form>
	);
	
}