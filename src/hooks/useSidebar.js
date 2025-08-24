import { useDispatch, useSelector } from "react-redux";
import { hideSidebar, toggleSidebar } from "../utils/sidebarSlice";

const useSidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((store) => store.sidebar);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleHideSidebar = () => {
    dispatch(hideSidebar());
  };

  return { handleToggleSidebar, handleHideSidebar, isSidebarOpen };
};

export default useSidebar;
