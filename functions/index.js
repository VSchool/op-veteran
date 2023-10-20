const functions = require("firebase-functions");
const firebase = require("firebase");
const admin = require("firebase-admin");

// const Firebase = firebase.initializeApp({
// 	apiKey: "AIzaSyCs--Y464NA0UNY00kp-0G5g07_qDoPH5U",
// 	authDomain: "op-veterans-dev.firebaseapp.com",
// 	projectId: "op-veterans-dev",
// 	storageBucket: "op-veterans-dev.appspot.com",
// 	messagingSenderId: "1051774604446",
// 	appId: "1:1051774604446:web:86911cc8aeda5a9636d78f"
// });

//NEW setup (not sure if this is even being used anyway)
// const Firebase = firebase.initializeApp({
//   apiKey: 'AIzaSyA3nRjJCbk9BqcAIkm7VPSp-4-yVVIb61M',
//   authDomain: 'op-veteran-dev.firebaseapp.com',
//   projectId: 'op-veteran-dev',
//   storageBucket: 'op-veteran-dev.appspot.com',
//   messagingSenderId: '355726156805',
//   appId: '1:355726156805:web:74d95fc681204c8b53286c',
// })

const firestore = firebase.firestore();
admin.initializeApp();

const vendorRef = firestore.collection("vendors");

exports.test = functions.https.onCall((data, context)=>(
  {message: `A: ${data.a} | B: ${data.b} | C: ${data.c}`}
));

exports.removeCart = functions.https.onCall((data, context)=>{
  return vendorRef.doc.update({
    cartId: null,
  });
});
