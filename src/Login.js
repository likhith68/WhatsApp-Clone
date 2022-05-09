import React from 'react';
import './Login.css';

function Login() {
    const signIn = ()=>{

    }
  return (
    <div className='login'>
      <div className="login__container">
          <img src="https://pixabay.com/vectors/whatsapp-whatsapp-logo-whatsapp-icon-6273368/" alt="" />
          <div className="login__text">
              <h1>Sign in to WhatsApp</h1>
          </div>
          <button onClick={signIn}>Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login