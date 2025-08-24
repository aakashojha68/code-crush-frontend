import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../utils/sidebarSlice";

const useSidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((store) => store.sidebar);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return { handleToggleSidebar, isSidebarOpen };
};

export default useSidebar;
