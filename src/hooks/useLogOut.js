import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constant";

const useLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.get(BACKEND_BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.dir(error);
    }
  };

  return { handleLogOut };
};

export default useLogOut;
