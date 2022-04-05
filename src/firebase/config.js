// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAc-82ml0U_hV486eFAd4UGJg1LKBo6Ugc",
    authDomain: "chat-app-aae79.firebaseapp.com",
    projectId: "chat-app-aae79",
    storageBucket: "chat-app-aae79.appspot.com",
    messagingSenderId: "712655121533",
    appId: "1:712655121533:web:d07ae615676b721a139514",
    measurementId: "G-C0DLL3R43P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth()
const db = firebase.firestore()

auth.useEmulator("http://localhost:9099", { disableWarnings: true });


if (window.location.hostname === "localhost") {
    db.useEmulator("localhost", 8090);
}
export { db, auth }

export default firebase;