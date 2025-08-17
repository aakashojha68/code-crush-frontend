import useConnections from "../hooks/useConnections";
import { useSelector } from "react-redux";
import ConnectionCardSkeleton from "../skeletons/ConnectionCardSkeleton";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const navigate = useNavigate();
  const { loading } = useConnections();
  const connections = useSelector((store) => store.connections);

  const handleMessageClick = (targetUserId) => {
    navigate("/chat/" + targetUserId);
  };

  return (
    <div className="my-4 relative w-full px-4">
      <div className="divider text-xl font-bold my-6">Connections</div>

      {loading
        ? Array(3)
            .fill()
            .map((_, i) => {
              return <ConnectionCardSkeleton key={i} />;
            })
        : connections.map((connection) => {
            return (
              <div
                key={connection._id}
                className="card card-side bg-base-200 shadow-sm mt-4 w-full"
              >
                <div className="card-body sm:flex-row gap-10 w-full">
                  <div className="avatar">
                    <div className=" skeleton w-30 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={
                          connection.photoUrl ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="card-title">
                      {connection.firstName} {connection.lastName}
                    </h2>
                    <p className="line-clamp-2">{connection.about}</p>
                    <div className="card-actions mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleMessageClick(connection._id)}
                      >
                        Message
                      </button>
                      {/* <button className="btn btn-secondary">Accept</button> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

      {!loading && (!connections || connections.length === 0) && (
        <h1 className="my-2">No connection found !!</h1>
      )}
    </div>
  );
};

export default Connections;
