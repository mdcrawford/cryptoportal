import firebase from "../configs/firebaseConfig";

export default function() {
  firebase
    .auth()
    .signOut()
    .catch(error => {
      alert("There was a problem logging you out: " + error.message);
    });
}
