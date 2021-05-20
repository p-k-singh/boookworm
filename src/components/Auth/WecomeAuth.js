import React, { useState, useEffect } from "react";
import fire from "../../fire";
import sample from "../../Assets/lovid.mp4";
import Login from "./Login";
import Signup from "./Signup";
import "./Auth.css";

function Welcome(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");

  const handleLogin = () => {
    console.log("Logged in Successfully");
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
      console.log("Login work")
  };

  const handleSignup = () => {
    if(password!==cpassword)
    {
      alert('Not Matched');
      return;
    }
    console.log("signup running");
    clearErrors();
    
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // .catch((err) => {
      //   switch (err.code) {
      //     case "auth/email-already-in-use":
      //     case "auth/invalid-email":
      //       setEmailError(err.message);
      //       break;
      //     case "auth/weak-password":
      //       setPasswordError(err.message);
      //       break;
      //   }
      // });
      console.log("signup work")
  };

  const handleLogout = () => {
    fire.auth().signOut();
    console.log("Logout work")
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  

  var lora;

  
  if (hasAccount === false)
    lora = (
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        cpassword={cpassword}
        setPassword={setPassword}
        setCPassword={setCPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        cpasswordError={cpasswordError}
        mobile={mobile}
        setMobile={setMobile}
        fullName={fullName}
        setFullName={setFullName}
      />
    );
  else 
    lora = (
      <Signup
        email={email}
        setEmail={setEmail}
        password={password}
        cpassword={cpassword}
        setPassword={setPassword}
        setCPassword={setCPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        cpasswordError={cpasswordError}
        mobile={mobile}
        setMobile={setMobile}
        fullName={fullName}
        setFullName={setFullName}
      />
    );
  return (
    <div className="App">
      <div className="losi">
        
        <video
          className="videoTag"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            //left: "50%",
            //top: "50%",
            //height: "100%",
            //objectFit: "cover",
            // transform: "translate(-50%,-50%)",
            zIndex: "-1",
          }}
        >
          <source src={sample} type="video/mp4"></source>
        </video>
        <div className="lora">{lora}</div>
      </div>
    </div>
  );
}

export default Welcome;