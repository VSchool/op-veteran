import firebase from "./Firebase";

const Firestore = firebase.firestore();

/* Create a new user document from an Authentication user */
export function createUser(auth) {
	const ref = Firestore.doc(`Users/${auth.email}`);
	ref.set({
		email: auth.email,
		name: auth.displayName || "",
		userImg: auth.photoURL || "",
		isRegistrationComplete: false,
		isAdmin: false
	});
}

export default Firestore;