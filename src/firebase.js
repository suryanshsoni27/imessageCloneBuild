import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4mxcFPu2t8-zYFiQPz06Inx1-eZ9pn64",
  authDomain: "imessageclone-sam.firebaseapp.com",
  databaseURL: "https://imessageclone-sam.firebaseio.com",
  projectId: "imessageclone-sam",
  storageBucket: "imessageclone-sam.appspot.com",
  messagingSenderId: "505115813901",
  appId: "1:505115813901:web:d97c5e5ef28f531ca68d44",
  measurementId: "G-G1JQGWP15L",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
