import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { addFeed, removeFeed } from "../utils/feedSlice";

const useFeed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LIMIT = 2;

  const { totalUsers, feeds } = useSelector((store) => store.feed);
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showShimmer, setShowShimmer] = useState(true);

  const fetchUserFeed = async () => {
    try {
      setShowShimmer(true);
      const res = await axios.get(
        BACKEND_BASE_URL + "/user/feed?limit=" + LIMIT,
        {
          withCredentials: true,
        }
      );
      dispatch(
        addFeed({ feeds: res.data.data, totalUsers: res.data.totalUsers })
      );
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setShowShimmer(false);
    }
  };

  const handleUserAction = async (status, id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        BACKEND_BASE_URL + "/request/send/" + status + "/" + id,
        {
          withCredentials: true,
        }
      );
      setToastConfig({ isVisible: true, message: res.data.message });
      dispatch(removeFeed(id));

      // refresh the data
      if (totalUsers > 1 && feeds?.length <= 1) {
        fetchUserFeed();
      }

      setTimeout(() => setToastConfig({ isVisible: false, message: "" }), 3000);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFeed();
  }, []);

  return {
    handleUserAction,
    toastConfig,
    feeds,
    loading,
    showShimmer,
  };
};

export default useFeed;
