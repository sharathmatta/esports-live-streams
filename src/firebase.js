import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA62an2yCTIIw8oXRrUfxrrK1HG_nthqnk",
  authDomain: "esports-live-streams.firebaseapp.com",
  databaseURL: "https://esports-live-streams.firebaseio.com",
  projectId: "esports-live-streams",
  storageBucket: "esports-live-streams.appspot.com",
  messagingSenderId: "707788051087",
  appId: "1:707788051087:web:06ded910436348cfee16fa",
  measurementId: "G-Z0E0ZD2PWB",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export default {
  db: db,
  auth: auth,
};
