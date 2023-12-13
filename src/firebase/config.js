// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP9iqUpns3UFn17tytAFUa6qpQxSLjrhw",
  authDomain: "tesvue-8b95c.firebaseapp.com",
  projectId: "tesvue-8b95c",
  storageBucket: "tesvue-8b95c.appspot.com",
  messagingSenderId: "314403062989",
  appId: "1:314403062989:web:e8e3e5cf04d26da0c79584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firestore
const projectFirestore = firebase.firestore()
export { projectFirestore }