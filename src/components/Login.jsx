import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("shubham@gmail.com");
  const [password, setPassword] = useState("Shubham@123");

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleLoginClick = async () => {
    try {
      await axios.post(
        BACKEND_BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/feed", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-[60px]">
        <div className="card w-96 bg-base-300 card-lg shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={handleEmailChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={handlePasswordChange}
              />
            </fieldset>
            <div className="justify-center card-actions mt-5">
              <button className="btn btn-primary" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
