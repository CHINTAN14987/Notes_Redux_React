import { useState } from "react";
import "../css/SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    username: "",
  });
  let navigate = useNavigate();
  const SignUpHandler = () => {
    console.log(signUpData);
    navigate("/home");
  };

  const inputDataHandler = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="signUpContainer">
        <div className="signUp_Flex_Container">
          <h3 className="title">Create Your Account</h3>
          <p>Just a few more steps and you're done! We hate paperwork, too.</p>
          <input
            className="input2"
            placeholder="username"
            value={signUpData.username}
            name="username"
            type="text"
            onChange={inputDataHandler}
            required
          />
          <input
            className="input1"
            placeholder="email or phone number"
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

          <button onClick={SignUpHandler}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
