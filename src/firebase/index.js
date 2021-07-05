import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBppw7GARXS3noybA7EivVW3xbunl8yM7w",
  authDomain: "mammoth-bike-store.firebaseapp.com",
  projectId: "mammoth-bike-store",
  storageBucket: "mammoth-bike-store.appspot.com",
  messagingSenderId: "37477313561",
  appId: "1:37477313561:web:fff8777274f1a93fd50e88"
};

const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => app;

export const getFirestore = () => firebase.firestore(app);
