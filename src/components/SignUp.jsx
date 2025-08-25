import axios from "axios";
import { useState } from "react";
import Toast from "./Toast";
import Loader from "./Loader";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import MandatoryField from "./MandatoryField";

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
    { name: "firstName", label: "First Name", type: "text", mandatory: 1 },
    { name: "lastName", label: "Last Name", type: "text", mandatory: 1 },
    { name: "email", label: "Email", type: "email", mandatory: 1 },
    { name: "password", label: "Password", type: "password", mandatory: 1 },
    { name: "phoneNumber", label: "Phone Number", type: "text", mandatory: 1 },
    { name: "gender", label: "Gender", type: "select", mandatory: 1 },
    { name: "age", label: "Age", type: "number", mandatory: 1 },
    { name: "photoUrl", label: "Photo URL", type: "text" },
    { name: "about", label: "About", type: "textarea" },
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
      <Toast isVisble={toastConfig.isVisible} message={toastConfig.message} />
      <div className="flex justify-center m-2">
        <div className="card w-full md:max-w-2xl bg-base-300 shadow-sm ">
          <div className="card-body">
            <h2 className="card-title">Sign Up</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
              {fields.map(({ name, label, type, mandatory }) => (
                <fieldset key={name} className="fieldset">
                  <legend className="fieldset-legend gap-1">
                    {label} {mandatory === 1 && <MandatoryField />}
                  </legend>
                  {type === "textarea" ? (
                    <textarea
                      className="textarea h-24"
                      name={name}
                      value={formData?.[name] || ""}
                      onChange={handleChange}
                    />
                  ) : type === "select" ? (
                    <select
                      className="select"
                      name={name}
                      value={formData?.[name] || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
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
            </div>

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
