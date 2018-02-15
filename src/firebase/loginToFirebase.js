import firebase from "../configs/firebaseConfig.js";

export default function(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      alert("There was a problem logging you in: " + error.message);
    });
}
