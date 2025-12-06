import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {

<<<<<<< Updated upstream
const [signState, setSignState] = useState("Sign In")


=======
  const [signState, setSignState] = useState("Sign In")
>>>>>>> Stashed changes

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
<<<<<<< Updated upstream

      <div className='login-form'>
=======
      <div className="login-form">
>>>>>>> Stashed changes
        <h1>{signState}</h1>
        <form>

<<<<<<< Updated upstream
        <form>
          {signState==="Sign Up"? 
          <input type="text" placeholder="Your Name"/>:<></>}
         
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

=======
          {signState === "Sign Up" && (
            <input type="text" placeholder='Your Name' />
          )}

          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
>>>>>>> Stashed changes
          <button>{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
<<<<<<< Updated upstream
          {signState==="Sign In" ?   
          <p> New to Netflix? <span onClick={()=>{setSignState("Sign Up")}} className="switch-link">Sign Up Now</span></p>
          : <p>Already have an account? <span onClick={()=>{setSignState("Sign In")}}className="switch-link">Sign In Now</span></p>}
        

         
=======

          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
          ) : (
            <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign in Now</span></p>
          )}

>>>>>>> Stashed changes
        </div>

      </div>
    </div>
  )
}

export default Login
