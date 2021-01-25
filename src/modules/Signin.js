import firebase from "./Firebase";

function Signin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebase.auth().signInWithPopup(provider);
    })
    .catch((error) => {
      console.log(error);
    });
}
export default Signin;
