import { Link, useParams } from "react-router-dom";
import useConnections from "../hooks/useConnections";
import ConnectionCardSkeleton from "../skeletons/ConnectionCardSkeleton";
import { X } from "lucide-react";
import useSidebar from "../hooks/useSidebar";

const Sidebar = () => {
  const { loading, connections } = useConnections();
  const { handleToggleSidebar } = useSidebar();
  const { targetUserId } = useParams();

  return (
    <div className="w-80 bg-base-200 border-r border-gray-700 overflow-y-auto">
      <ul className="menu p-2 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl py-4">Chat</h1>
          <button
            className="cursor-pointer me-2 hover:text-gray-300"
            onClick={handleToggleSidebar}
          >
            <X />
          </button>
        </div>

        {!loading && connections.length === 0 && (
          <div className="card bg-base-300 shadow-sm mt-6 w-full max-w-md justify-self-center">
            <div className="card-body items-center text-center">
              <span className="text-5xl mb-2">💬</span>
              <h2 className="card-title">No Chats</h2>
              <p className="text-gray-500">
                Looks like you haven’t connected with anyone yet — start a chat
                when you do!
              </p>
            </div>
          </div>
        )}

        {loading &&
          Array(3)
            .fill()
            .map((_, i) => <ConnectionCardSkeleton key={i} />)}
        {!loading &&
          connections.length > 0 &&
          connections.map((connection) => {
            return (
              <Link key={connection._id} to={"/chat/" + connection._id}>
                <div
                  className={` card card-side shadow-sm p-2 hover:bg-base-100 cursor-pointer ${
                    targetUserId === connection._id.toString()
                      ? "bg-base-100"
                      : "bg-base-200"
                  }`}
                >
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
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
