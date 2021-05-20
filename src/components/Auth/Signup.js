import React from "react";

const Signup = (props) => {
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

  const validatePcP = () => {
    if (password !== cpassword) {
      alert("Passwords don't match"); 
    } else { 
      // make API call
    }
  }

  return (
    <>
      <section className="signup">
        <div className="signupContainer">
          <h2>Book Worm</h2>
          <label>Full Name</label>
          <input
            type="text"
            autoFocus
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Email Id / Mobile No</label>
          <input
            type="text"
            autoFocus
            required
            //  value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <p className="errorMsg">{emailError}</p> */}
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          
          <div className="btnContainer">
              <>
              <button className="BButton"
                onClick={() => handleSignup() }
              >
                Sign Up
              </button>
              <p>
                Have an account ?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Log In</span>
              </p>
            </>
          
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;