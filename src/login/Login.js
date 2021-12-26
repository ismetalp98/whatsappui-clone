import React from "react";
import { Button } from "@mui/material";
import "./Login.css";
import {  provider } from "../firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { getAuth,signInWithPopup } from "firebase/auth";
function Login() {
    const [{}, dispatch] = useStateValue();
// dispatch updates the previous state
function auth(){
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {

    console.log(result)
    dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
      dispatch({
        type: actionTypes.SET_SESSION,
        uid: result.user.uid,
        displayName: result.user.displayName,
      });
      // ...
    }).catch((error) => {
     alert(error.message)
      // ...
    });
}

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt="whatsapp"
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button style={{background:"#0fb45c",color:"white",fontFamily:"Mulish"}} onClick={auth}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
