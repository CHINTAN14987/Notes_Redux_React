import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Login.css";

const Login = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const LoginHandler = () => {
    navigate("/home");
  };

  const inputDataHandler = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="loginContainer">
        <div className="login_Flex_Container">
          <h3 className="title">SignIn Your Account</h3>

          <input
            className="input1"
            placeholder="email"
            value={signUpData.email}
            name="email"
            onChange={inputDataHandler}
            required
          />

          <input
            className="input2"
            placeholder="password"
            value={signUpData.password}
            name="password"
            type="password"
            onChange={inputDataHandler}
            required
          />

          <button onClick={LoginHandler}>Login</button>
          <h3 className="Login_Link_Title">
            New Here? <span onClick={() => navigate("/")}>Sign up now.</span>
          </h3>
          <h3 className="Capcha_link">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <span>Learn more.</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
