import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { addConnection } from "../utils/connectionSlice";

const useConnections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BACKEND_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return { loading };
};

export default useConnections;
