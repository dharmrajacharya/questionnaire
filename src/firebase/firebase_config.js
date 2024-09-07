// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfigOld = {
  apiKey: "AIzaSyAlYb8PTgdu0D5XRBHQ97z3QIitJhFRF58",
  authDomain: "draj-5f083.firebaseapp.com",
  databaseURL: "https://draj-5f083.firebaseio.com",
  projectId: "draj-5f083",
  storageBucket: "draj-5f083.appspot.com",
  messagingSenderId: "217312753594",
  appId: "1:217312753594:web:a31472c9b3637eeb054f83"
};

const firebaseConfig = {
  apiKey: "AIzaSyBKVADK4zqHkhRr3d9jD75VvgS8pFoIdqQ",
  authDomain: "qapp-d05c8.firebaseapp.com",
  projectId: "qapp-d05c8",
  storageBucket: "qapp-d05c8.appspot.com",
  messagingSenderId: "749342906053",
  appId: "1:749342906053:web:a476405f8aca8e6d9e02ac",
  measurementId: "G-99K3P3DGWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }