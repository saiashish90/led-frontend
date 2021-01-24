import { React, useState, useEffect } from "react";
import "./css/App.css";
import Signin from "./Signin";

import firebase from "firebase";
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

function App() {
  const [signedin, setSignedin] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedin(true);
      } else setSignedin(false);
    });
  });
  let leds = 1;
  let divs = [];
  while (leds--) {
    divs.push(
      <div id="led1" className="light">
        <input type="checkbox" name="power" id="power" />
      </div>
    );
  }
  if (signedin) {
    return <div>helooo</div>;
  } else return <Signin></Signin>;
}

export default App;
