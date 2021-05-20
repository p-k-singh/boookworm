import React from "react";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    cpassword,
    setPassword,
    setCPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    mobile,
    setMobile,
    fullName,
    setFullName,
  } = props;

  return ( <>
    <section className="login">
      <div className="loginContainer">
         <h2>Book Worm</h2>
        <label>Email Id / Mobile No</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        
        <div className="btnContainer">
           <>
              <button className="BButton" onClick={handleLogin}>Log In</button>
              <p> New User ? <span onClick={() => setHasAccount(!hasAccount)}> Sign Up </span> </p>
              <p><span > Forget Password </span></p>
            </>
          
        
        </div>
      </div>
    </section>
   </>
  );
};

export default Login;