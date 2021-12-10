import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const Firebase = firebase.initializeApp({
	apiKey: "AIzaSyCs--Y464NA0UNY00kp-0G5g07_qDoPH5U",
	authDomain: "op-veterans-dev.firebaseapp.com",
	projectId: "op-veterans-dev",
	storageBucket: "op-veterans-dev.appspot.com",
	messagingSenderId: "1051774604446",
	appId: "1:1051774604446:web:86911cc8aeda5a9636d78f"
});

export const Auth = Firebase.auth();
export const Storage = Firebase.storage();

let actionCodeSettings = { 
	url: 'https://op-veterans-dev.firebaseapp.com/',  
	handleCodeInApp: false
}

export function googleSignIn(handleErrors) {
	const provider = new firebase.auth.GoogleAuthProvider();
	Auth.signInWithPopup(provider)
		.then(resp=>console.log(resp.user.photoURL))
		.catch(err => handleErrors(err));
}

export function emailSignIn(email, password, handleErrors) {
	Auth.signInWithEmailAndPassword(email, password)
		.then(res =>{ 
			console.log("sign in with email and password response: ", res)
			if(!res.user.emailVerified) handleErrors({message:"Email must be verified to continue"})
		})
		.catch(err => handleErrors(err));
}

export function emailSignup(email, password, handleErrors) {
	Auth.createUserWithEmailAndPassword(email, password)
		.then((userCredential)=>{
			// send verification mail
			userCredential.user.sendEmailVerification(actionCodeSettings)
				.then(()=> {
					Auth.signOut()
				})
				.catch((err)=> handleErrors(err))
			console.log("User credential: ", userCredential)
			console.log("user credential.user ", userCredential.user)
			console.log("email sent!!")
		})
		.catch(err => handleErrors(err));
}

export function signOut(handleErrors) {
	Auth.signOut()
		.catch(err => handleErrors(err));
}

export default Firebase;