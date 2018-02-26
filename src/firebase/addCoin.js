import firebase from "../configs/firebaseConfig";
import validateFirebaseInput from "./validateFirebaseInput";

export default function(name, abbrev) {
  if (!validateFirebaseInput(name)) {
    alert("ERROR: Cannot contain the characters ., #, $, [, or ]");
  } else {
    firebase
      .database()
      .ref("/coins/" + name)
      .set(abbrev)
      .then(response => {
        alert("Coin added!");
      })
      .catch(error => {
        alert("ERROR: " + error.message);
      });
  }
}
