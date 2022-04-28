import firebase from './Firebase'

const firestore = firebase.firestore()

/* Create a new user document from an Authentication user */
export function createUser(auth) {
  const ref = firestore.doc(`Users/${auth.email}`)
  ref.set({
    email: auth.email,
    name: auth.displayName || '',
    userImg: auth.photoURL || '',
    isRegistrationComplete: false,
  })
}
export function createBooth(id, data) {
  const ref = firestore.doc(`Booths/${id}`)
  ref.set(data)
}

export function checkPermissions(uid) {
  return firestore
    .doc(`Permissions/${uid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()
      }
      return null
    })
    .catch((err) => console.error(err))
}

export default firestore
