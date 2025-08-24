import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Handshake,
  LogOut,
  MessageCircleMore,
  MessageSquareDot,
  UserRoundPen,
} from "lucide-react";
import useLogOut from "../hooks/useLogOut";
import useSidebar from "../hooks/useSidebar";

const VerticalNavbar = () => {
  const user = useSelector((store) => store.user);
  const { handleLogOut } = useLogOut();
  const { handleToggleSidebar, handleHideSidebar } = useSidebar();

  const options = [
    {
      name: "Profile",
      path: "/profile",
      icon: <UserRoundPen />,
      onClick: handleHideSidebar,
    },
    {
      name: "Feed",
      path: "/feed",
      icon: <MessageSquareDot />,
      onClick: handleHideSidebar,
    },
    {
      name: "Invitations",
      path: "/invitations",
      icon: <Handshake />,
      onClick: handleHideSidebar,
    },
    {
      name: "Chat",
      path: "#",
      icon: <MessageCircleMore />,
      onClick: handleToggleSidebar,
    },
    { name: "Logout", path: "", icon: <LogOut />, onClick: handleLogOut },
  ];

  if (!user) return;

  return (
    <div className="w-auto bg-base-300">
      <ul tabIndex={0} className="menu menu-sm w-full p-2 mt-2 md:mt-3">
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
