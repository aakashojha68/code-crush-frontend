import axios from "axios";
import { useState } from "react";
import Toast from "./Toast";
import Loader from "./Loader";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    message: "",
  });

  // Form fields configuration
  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "gender", label: "Gender", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "about", label: "About", type: "textarea" },
    { name: "photoUrl", label: "Photo URL", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      setLoader(true);

      const res = await axios.post(BACKEND_BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
      setToastConfig({
        isVisible: true,
        message: "User created successfully !!",
      });

      setTimeout(() => {
        setToastConfig({ isVisible: false, message: "" });
      }, 3000);

      navigate("/feed", { replace: true });
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-screen">
      {loader && <Loader />}
      <Navbar />
      {/* <div className="flex flex-col justify-center items-center mb-4 "> */}
      <Toast isVisble={toastConfig.isVisible} message={toastConfig.message} />
      <div className="flex justify-center m-2">
        <div className="card w-full md:w-96 bg-base-300 shadow-sm ">
          <div className="card-body">
            <h2 className="card-title">Sign Up</h2>
            {fields.map(({ name, label, type }) => (
              <fieldset key={name} className="fieldset">
                <legend className="fieldset-legend">{label}</legend>
                {type === "textarea" ? (
                  <textarea
                    className="textarea h-24"
                    placeholder="Bio"
                    name={name}
                    value={formData?.[name] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    className="input"
                    value={formData?.[name] || ""}
                    onChange={handleChange}
                  />
                )}
              </fieldset>
            ))}

            <h3 className="text-sm text-red-600 ">{error}</h3>

            <div className="justify-center card-actions mt-5">
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>

            <h3 className="text-sm text-center ">
              Existing User ?{" "}
              <Link to={"/login"} className="hover:text-gray-300">
                Log In
              </Link>
            </h3>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SignUp;
