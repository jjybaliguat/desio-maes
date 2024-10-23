// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIqHV4GunDoVWqe0AxY_YLP7dYs5_gIGU",
  authDomain: "gps-tracker-438300.firebaseapp.com",
  databaseURL: "https://gps-tracker-438300-default-rtdb.firebaseio.com",
  projectId: "gps-tracker-438300",
  storageBucket: "gps-tracker-438300.appspot.com",
  messagingSenderId: "380579544429",
  appId: "1:380579544429:web:c97783fd4a9629ed762e64",
  measurementId: "G-LZ9PEWNDRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app);
const database = getDatabase(app);

export {app, auth, database, ref, onValue}