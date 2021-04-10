import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1fEfzZOjMxsRmk1xbKX5Zxq3bLg7CGyY",
  authDomain: "chatware-2.firebaseapp.com",
  projectId: "chatware-2",
  storageBucket: "chatware-2.appspot.com",
  messagingSenderId: "427676537786",
  appId: "1:427676537786:web:ae86958cb9cc00e891c383",
  measurementId: "G-9V66H2W522",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
