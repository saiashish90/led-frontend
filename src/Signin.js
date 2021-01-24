import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDZIPXkQBOtsKdMYqLvReojO4PUUwh-9xs",
    authDomain: "leds-a6036.firebaseapp.com",
    databaseURL: "https://leds-a6036-default-rtdb.firebaseio.com",
    projectId: "leds-a6036",
    storageBucket: "leds-a6036.appspot.com",
    messagingSenderId: "103184560566",
    appId: "1:103184560566:web:498f705bafe7333bc21117",
    measurementId: "G-BGJ77QYHD9",
  });
} else {
  firebase.app(); // if already initialized, use that one
}
const uiConfig = {
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
function Signin() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
export default Signin;
