import firebase from "../configs/firebaseConfig.js";

export default function(newPassword) {
  firebase
    .auth()
    .currentUser.updatePassword(newPassword)
    .then(() => {
      alert("Password updated successfully!");
    })
    .catch(error => {
      alert("ERROR: " + error.message);
    });
}
