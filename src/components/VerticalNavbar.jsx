import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  Handshake,
  LogOut,
  MessageCircleMore,
  MessageSquareDot,
  UserRoundPen,
} from "lucide-react";
import useLogOut from "../hooks/useLogOut";
import useSidebar from "../hooks/useSidebar";

/*
TODO: 
1. add valid icon in place - done
2. Add opening and close side bar - done
3. check it for mobile screen

*/
const VerticalNavbar = () => {
  const user = useSelector((store) => store.user);
  const { handleLogOut } = useLogOut();
  const { handleToggleSidebar, isSidebarOpen } = useSidebar();

  const options = [
    { name: "Profile", path: "/profile", icon: <UserRoundPen /> },
    { name: "Feed", path: "/feed", icon: <MessageSquareDot /> },
    { name: "Invitations", path: "/invitations", icon: <Handshake /> },
    {
      name: "Chat",
      path: "#",
      icon: <MessageCircleMore />,
      onClick: handleToggleSidebar,
    },
    { name: "Logout", path: "", icon: <LogOut />, onClick: handleLogOut },
  ];

  return (
    <div className="w-auto bg-base-300">
      <ul tabIndex={0} className="menu menu-sm mt-3 w-full p-2">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 md:w-14 rounded-full ring-2 ring-offset-2">
            <img
              src={
                user.photoUrl ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>
        <div className="my-4">
          {options.map((option) => {
            return (
              <li
                className="tooltip tooltip-right my-2"
                data-tip={option.name}
                key={option.name}
              >
                <NavLink
                  to={option.path}
                  onClick={option?.onClick}
                  className={({ isActive }) =>
                    isActive && option.path !== "#"
                      ? "justify-center py-2 menu-active"
                      : "justify-center py-2"
                  }
                >
                  {option.icon}
                </NavLink>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default VerticalNavbar;
