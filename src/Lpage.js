import React from 'react';
import "./Lpage.css";
import {Button} from "@mui/material";
import {auth, provider} from "./firebase";
import {useStateValue} from "./StateProvider";
import{actionTypes} from "./reducer"

function Lpage() {
  const[{},dispatch]=useStateValue();
  
  //for google Authentication
  const signIn =()=>{
    auth.signInWithPopup(provider)
    .then(result=>{
      dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
      });
    })
    .catch((error)=>alert(error.message));
  }

  return (
    <div className='login'>
      <div className="login__container">
        <img src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png" width="300" alt="" />
        <div className="login__text">
          <h1>Sign In to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  )
}

export default Lpage
