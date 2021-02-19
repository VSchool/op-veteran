import firebase from "./Firebase";

const firestore = firebase.firestore();

/* Create a new user document from an Authentication user */
export function createUser(auth) {
	const ref = firestore.doc(`Users/${auth.email}`);
	ref.set({
		email: auth.email,
		name: auth.displayName || "",
		userImg: auth.photoURL || "",
		isRegistrationComplete: false
	});
}

export function checkPermissions(uuid) {
	return firestore.doc(`Permissions/${uuid}`).get().then(doc => {
		if (doc.exists) {
			return doc.data();
		}
		return null;
	}).catch(err => console.error(err));
}

export default firestore;