import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
	apiKey: "AIzaSyCs--Y464NA0UNY00kp-0G5g07_qDoPH5U",
	authDomain: "op-veterans-dev.firebaseapp.com",
	projectId: "op-veterans-dev",
	storageBucket: "op-veterans-dev.appspot.com",
	messagingSenderId: "1051774604446",
	appId: "1:1051774604446:web:86911cc8aeda5a9636d78f"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export function googleSignIn(handleErrors) {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider)
		.catch(err => handleErrors(err));
}

export function emailSignIn(email, password, handleErrors) {
	auth.signInWithEmailAndPassword(email, password)
		.catch(err => handleErrors(err));
}

export function emailSignup(email, password, handleErrors) {
	auth.createUserWithEmailAndPassword(email, password)
		.catch(err => handleErrors(err));
}

export function signOut(handleErrors) {
	auth.signOut()
		.catch(err => handleErrors(err));
}

export default firebase;