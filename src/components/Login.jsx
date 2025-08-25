import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import Loader from "./Loader";
import Toast from "./Toast";
import useTokenValid from "../hooks/useTokenValid";
import MandatoryField from "./MandatoryField";

const Login = () => {
  const { loading } = useTokenValid();
  const navigate = useNavigate();
  const [email, setEmail] = useState("shubham@gmail.com");
  const [password, setPassword] = useState("Shubham@gmail.com");
  const [loader, setLoader] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    message: "",
    className: "",
  });

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
      setLoader(true);
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
      setToastConfig(() => ({
        isVisible: true,
        message:
          error.response.data.message ||
          "Something went wrong, please try again after some time !!",
        className: "alert-error",
      }));

      setTimeout(
        () =>
          setToastConfig({
            isVisible: false,
            message: "",
          }),
        5000
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {(loader || loading) && <Loader />}
      <Navbar />
      <Toast
        isVisble={toastConfig.isVisible}
        message={toastConfig.message}
        className={toastConfig.className}
      />
      <div className="flex justify-center mt-[60px]">
        <div className="card w-96 bg-base-300 card-lg shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend gap-1">
                Email
                <MandatoryField />
              </legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={handleEmailChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend gap-1">
                Password
                <MandatoryField />
              </legend>
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
            <h3 className="text-sm text-center ">
              New User ?{" "}
              <Link to={"/signup"} className="hover:text-gray-300">
                Sign Up
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
