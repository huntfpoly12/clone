// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG6ddaErsXw8C6qcwS746pOXk5fXmQ93s",
  authDomain: "chat-jangbuda.firebaseapp.com",
  databaseURL: "https://chat-jangbuda-default-rtdb.firebaseio.com",
  projectId: "chat-jangbuda",
  storageBucket: "chat-jangbuda.appspot.com",
  messagingSenderId: "610527349004",
  appId: "1:610527349004:web:64d407361ea91c90072129"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const databaseFirebase = getDatabase(app);
export { app, databaseFirebase };
