import useConnections from "../hooks/useConnections";
import { useSelector } from "react-redux";
import ConnectionCardSkeleton from "../skeletons/ConnectionCardSkeleton";

const Connections = () => {
  const { loading } = useConnections();
  const connections = useSelector((store) => store.connections);

  if (!loading && (!connections || connections.length === 0)) {
    return <h1>No connection found !!</h1>;
  }

  return (
    <div className="my-4 max-w-3xl relative m-auto">
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
                className="card card-side bg-base-200 shadow-sm mt-4"
              >
                <div className="card-body sm:flex-row gap-10 sm:items-center">
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
                      <button className="btn btn-primary">Reject</button>
                      <button className="btn btn-secondary">Accept</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Connections;
