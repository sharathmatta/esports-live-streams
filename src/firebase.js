import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDB2yqIZv-6Em7nE9ZPc7D4QgvYNWSOsXc",
  authDomain: "myproj156.firebaseapp.com",
  projectId: "myproj156",
  storageBucket: "myproj156.appspot.com",
  messagingSenderId: "261816591310",
  appId: "1:261816591310:web:7716fbc4755fbfbd1e819f",
  measurementId: "G-DJFZC8QZKG",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
