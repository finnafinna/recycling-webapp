import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqVHPjTwjLNYOQMwI_v4Dboz1V2ntBaDI",
    authDomain: "recycling-scanner-app-54ddc.firebaseapp.com",
    projectId: "recycling-scanner-app-54ddc",
    storageBucket: "recycling-scanner-app-54ddc.appspot.com",
    messagingSenderId: "441235234106",
    appId: "1:441235234106:web:dd96a234e8e90acedf0403",
    measurementId: "G-1023VP7SHE"
  };

let firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export default firebase
