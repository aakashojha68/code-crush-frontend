import { useSelector } from "react-redux";
import useInvitation from "../hooks/useInvitation";
import ConnectionCardSkeleton from "../skeletons/ConnectionCardSkeleton";
import Loader from "./Loader";

const Invitations = () => {
  const { loading, showShimmer, saveUserAction } = useInvitation();
  const invitations = useSelector((store) => store.invitations);

  return (
    <div className="my-4 relative w-full px-4">
      <div className="divider text-xl font-bold my-6">Invitations</div>
      {loading && <Loader />}

      {showShimmer
        ? Array(3)
            .fill()
            .map((_, i) => {
              return <ConnectionCardSkeleton key={i} />;
            })
        : invitations.map((invitation) => {
            const { fromUserId } = invitation;
            return (
              <div
                key={fromUserId._id}
                className="card card-side bg-base-200 shadow-sm mt-4 w-full"
              >
                <div className="card-body sm:flex-row gap-10 w-full">
                  <div className="avatar">
                    <div className=" skeleton w-30 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={
                          fromUserId.photoUrl ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="card-title">
                      {fromUserId.firstName} {fromUserId.lastName}
                    </h2>
                    <p className="line-clamp-2">{fromUserId.about}</p>
                    <div className="card-actions mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          saveUserAction("rejected", invitation._id)
                        }
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          saveUserAction("accepted", invitation._id)
                        }
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

      {!loading &&
        !showShimmer &&
        (!invitations || invitations.length === 0) && (
          <div className="card bg-base-200 shadow-sm mt-6 w-full max-w-md justify-self-center">
            <div className="card-body items-center text-center">
              <span className="text-5xl mb-2">🙌</span>
              <h2 className="card-title">No Invitations</h2>
              <p className="text-gray-500">
                Looks like you’re all caught up — no new invitations right now!
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default Invitations;
