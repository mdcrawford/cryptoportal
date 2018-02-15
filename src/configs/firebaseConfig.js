import firebase from "firebase";

// Initialize Firebase
let config = {
  apiKey: "AIzaSyCwFHbnyjkvBoA5Mj1a-d2UdsLZInBAabA",
  authDomain: "crypto-portal.firebaseapp.com",
  databaseURL: "https://crypto-portal.firebaseio.com",
  projectId: "crypto-portal",
  storageBucket: "crypto-portal.appspot.com",
  messagingSenderId: "546686053251"
};
export default firebase.initializeApp(config);
