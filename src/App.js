import { React, useState } from "react";
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
var database = firebase.database();

function App() {
  const [signedin, setSignedin] = useState(false);
  const [leds, setLeds] = useState([]);
  let userID;

  function powerOn(e) {
    let path;
    let checked;
    if (e.target.tagName === "DIV") {
      e.target.querySelector("input").checked = !e.target.querySelector("input")
        .checked;
      checked = e.target.querySelector("input").checked;
      path = `${userID}/${e.target.id}/is_on`;
      console.log(path);
    } else {
      checked = e.target.checked;
      path = `${userID}/${e.target.parentElement.id}/is_on`;
      console.log(path);
    }
    database.ref().update({ [path]: checked });
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setSignedin(true);
    } else setSignedin(false);
  });

  if (signedin) {
    let divs = [];
    userID = firebase.auth().currentUser.email.split("@")[0];
    if (leds.length === 0 || leds === undefined) {
      database
        .ref(`/${userID}/`)
        .once("value")
        .then((snapshot) => {
          setLeds(snapshot.val());
        });
    } else {
      Object.keys(leds).forEach((key) => {
        divs.push(
          <div key={key} id={key} onClick={powerOn} className="light">
            <input
              type="checkbox"
              defaultChecked={leds[key]["is_on"]}
              name="power"
              id="power"
            />
          </div>
        );
      });
    }
    return <div>{divs}</div>;
  } else return <Signin></Signin>;
}

export default App;
