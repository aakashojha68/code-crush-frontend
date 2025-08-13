import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const useUserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BACKEND_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }
  }, []);

  return { loading };
};

export default useUserDetails;
