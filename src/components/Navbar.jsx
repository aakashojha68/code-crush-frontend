import { useDispatch, useSelector } from "react-redux";
import { BACKEND_BASE_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
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

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Code Crush</a>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <h2>Hi, {user.firstName}</h2>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/feed" className="justify-between">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/invitations" className="justify-between">
                  Invitations
                </Link>
              </li>
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link onClick={handleLogOut}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
