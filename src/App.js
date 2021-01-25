import { React, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./modules/Firebase";
import Signin from "./modules/Signin";
import "./css/App.css";

var database = firebase.database();

function App() {
  const [user, loading] = useAuthState(firebase.auth());
  const [leds, setLeds] = useState([]);
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
          <div
            key={key}
            id={key}
            onClick={(e) => {
              powerOn(e, userID);
            }}
            className="light">
            <input type="checkbox" defaultChecked={leds[key]["is_on"]} name="power" id="power" />
          </div>
        );
      });
    }
    return <div>{divs}</div>;
  }
  return <button onClick={Signin}>Sign in</button>;
}

export default App;
