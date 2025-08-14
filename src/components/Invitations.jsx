import { useSelector } from "react-redux";
import useInvitation from "../hooks/useInvitation";
import ConnectionCardSkeleton from "../skeletons/ConnectionCardSkeleton";
import Loader from "./Loader";

const Invitations = () => {
  const { loading, showShimmer, saveUserAction } = useInvitation();
  const invitations = useSelector((store) => store.invitations);

  return (
    <div className="my-4 max-w-3xl relative m-auto">
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
                className="card card-side bg-base-200 shadow-sm mt-4"
              >
                <div className="card-body sm:flex-row gap-10 sm:items-center">
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
          <h1 className="my-2">No invitaions found !!</h1>
        )}
    </div>
  );
};

export default Invitations;
