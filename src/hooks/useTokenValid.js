import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const useTokenValid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { pathname } = useLocation();

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BACKEND_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      setIsTokenValid(true);
      dispatch(addUser(res.data.data));
      navigate(pathname, { replace: true });
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login", { replace: true });
        setIsTokenValid(false);

        // clearing slices
        dispatch(removeUser());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return { loading, isTokenValid };
};

export default useTokenValid;
