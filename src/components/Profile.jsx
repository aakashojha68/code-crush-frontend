import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constant";
import Toast from "./Toast";
import { updateUser } from "../utils/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [formData, setFormData] = useState(user);
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    message: "",
  });

  useEffect(() => {
    setFormData(user);
  }, [user]);

  // Form fields configuration
  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "gender", label: "Gender", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "about", label: "About", type: "text" },
    { name: "photoUrl", label: "Photo URL", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDetails = async () => {
    try {
      const editableFormData = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        gender: formData?.gender,
        hobbies: formData?.hobbies,
        photoUrl: formData?.photoUrl,
        age: formData?.age,
        about: formData?.about,
        phoneNumber: formData?.phoneNumber,
      };

      const res = await axios.patch(
        BACKEND_BASE_URL + "/profile/edit",
        editableFormData,
        {
          withCredentials: true,
        }
      );
      setToastConfig({
        isVisible: true,
        message: "Profile updated successfully !!",
      });
      dispatch(updateUser(editableFormData));

      setTimeout(() => {
        setToastConfig({ isVisible: false, message: "" });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return;

  return (
    <div className="flex justify-center gap-10 items-center">
      <Toast isVisble={toastConfig.isVisible} message={toastConfig.message} />
      <div className="flex justify-center my-2">
        <div className="card w-96 bg-base-300 card-lg shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>

            {fields.map(({ name, label, type }) => (
              <fieldset key={name} className="fieldset">
                <legend className="fieldset-legend">{label}</legend>
                <input
                  type={type}
                  name={name}
                  className="input"
                  value={formData?.[name] || ""}
                  onChange={handleChange}
                />
              </fieldset>
            ))}

            <div className="justify-center card-actions mt-5">
              <button className="btn btn-primary" onClick={handleUpdateDetails}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={formData} hideBtn={true} />
    </div>
  );
};

export default Profile;
