import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { addInvitation, removeInvitation } from "../utils/invitationSlice";

const useInvitation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showShimmer, setShowShimmer] = useState(true);

  const fetchInvitations = async () => {
    try {
      setShowShimmer(true);
      const res = await axios.get(BACKEND_BASE_URL + "/request/received", {
        withCredentials: true,
      });
      dispatch(addInvitation(res.data.data));
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setShowShimmer(false);
    }
  };

  const saveUserAction = async (action, requestId) => {
    try {
      setLoading(true);
      await axios.get(
        BACKEND_BASE_URL + "/request/review/" + action + "/" + requestId,
        {
          withCredentials: true,
        }
      );
      dispatch(removeInvitation(requestId));
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return { showShimmer, loading, saveUserAction };
};

export default useInvitation;
