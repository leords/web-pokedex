import firebase from "firebase/compat/app";
import 'firebase/compat/auth'


const firebaseConfig = {
  apiKey: "AIzaSyD13NuXgDDiq50-wTuvZGYkuEXBFBPzHf8",
  authDomain: "web-pokedex-d4df5.firebaseapp.com",
  projectId: "web-pokedex-d4df5",
  storageBucket: "web-pokedex-d4df5.appspot.com",
  messagingSenderId: "641810506776",
  appId: "1:641810506776:web:50da15d2e9b227e443cf6d",
  measurementId: "G-WZPKGYJHDP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


export {firebase, app, auth}

