import { React, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./modules/Firebase";
import Signin from "./modules/Signin";
import "./css/App.css";

var database = firebase.database();

function App() {
  const [user, loading] = useAuthState(firebase.auth());
  const [setLeds] = useState([]);
  function powerOn(e, userID) {
    let path;
    let checked;
    if (e.target.tagName === "DIV") {
      e.target.querySelector("input").checked = !e.target.querySelector("input").checked;
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

  if (loading) {
    return <div>loading...</div>;
  }

  if (user) {
    let divs = [];
    let userID = firebase.auth().currentUser.email.split("@")[0];
    let lsleds = {};
    if (localStorage.getItem("leds") === null) {
      database
        .ref(`/${userID}/`)
        .once("value")
        .then((snapshot) => {
          localStorage.setItem("leds", JSON.stringify(snapshot.val()));
          setLeds(snapshot.val());
        });
    } else {
      lsleds = JSON.parse(localStorage.getItem("leds"));
    }
    database.ref(`/${userID}/`).on("value", (snapshot) => {
      localStorage.setItem("leds", JSON.stringify(snapshot.val()));
      if (JSON.stringify(Object.keys(snapshot.val())) !== JSON.stringify(Object.keys(lsleds))) {
        lsleds = JSON.parse(localStorage.getItem("leds"));
        setLeds(lsleds);
      } else {
        lsleds = JSON.parse(localStorage.getItem("leds"));
      }
    });
    Object.keys(lsleds).forEach((key) => {
      divs.push(
        <div
          key={key}
          id={key}
          onClick={(e) => {
            powerOn(e, userID);
          }}
          className="light">
          <input type="checkbox" defaultChecked={lsleds[key]["is_on"]} name="power" id="power" />
        </div>
      );
    });

    return <div>{divs}</div>;
  }
  return <button onClick={Signin}>Sign in</button>;
}

export default App;
