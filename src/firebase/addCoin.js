import firebase from "../configs/firebaseConfig";

export default function(name, abbrev) {
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
