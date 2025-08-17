import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useConnections from "../hooks/useConnections";
import ConnectionCardSkeleton from "../skeletons/ConnectionCardSkeleton";

const Sidebar = () => {
  const { loading } = useConnections();
  const connections = useSelector((store) => store.connections);

  return (
    <div className="w-80 bg-base-200 border-r overflow-y-auto">
      <ul className="menu p-2">
        {loading
          ? Array(3)
              .fill()
              .map((_, i) => <ConnectionCardSkeleton key={i} />)
          : connections.map((connection) => (
              <Link key={connection._id} to={"/chat/" + connection._id}>
                <div className="card card-side bg-base-200 shadow-sm p-2 hover:bg-base-100 cursor-pointer">
                  <div className="card-body p-1 sm:flex-row gap-5">
                    <div className="avatar">
                      <div className="skeleton w-10 h-10 rounded-full">
                        <img
                          alt="profile"
                          src={
                            connection.photoUrl ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="card-title text-base">
                        {connection.firstName} {connection.lastName}
                      </h4>
                      <p className="line-clamp-2 text-sm">{connection.about}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </ul>
    </div>
  );
};

export default Sidebar;
