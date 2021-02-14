import firebase from "./Firebase";

const firestore = firebase.firestore();

/* Create a new user document from an Authentication user */
export function createUser(auth) {
	const ref = firestore.doc(`Users/${auth.email}`);
	ref.set({
		email: auth.email,
		name: auth.displayName || "",
		userImg: auth.photoURL || "",
		isRegistrationComplete: false,
		isAdmin: false
	});
}

export default firestore;