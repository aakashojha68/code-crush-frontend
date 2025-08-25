import { useSelector } from "react-redux";
import useInvitation from "../hooks/useInvitation";
import ConnectionCardSkeleton from "../skeletons/ConnectionCardSkeleton";
import Loader from "./Loader";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const Invitations = () => {
  const { loading, showShimmer, saveUserAction } = useInvitation();
  const invitations = useSelector((store) => store.invitations);

  return (
    <div className="my-4 relative w-full px-4 h-full overflow-y-auto">
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
                className="card card-side bg-base-200 shadow-sm mt-4 w-full max-w-lg mx-auto"
              >
                <div className="card-body sm:flex-row gap-4 md:gap-5 w-full items-start">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 md:w-14 rounded-full ring-2 ring-offset-2">
                      <img
                        src={
                          fromUserId.photoUrl ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="card-title text-base">
                      {fromUserId.firstName} {fromUserId.lastName}
                    </h2>
                    <p className="line-clamp-2 text-xs">{fromUserId.about}</p>
                  </div>
                  <div>
                    <div className="flex justify-center gap-4 md:mt-2">
                      {/* Reject button */}
                      <button
                        onClick={() =>
                          saveUserAction("rejected", invitation._id)
                        }
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 shadow cursor-pointer transform transition duration-200 hover:scale-110"
                        title="Reject"
                      >
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                      </button>

                      {/* Accept button */}
                      <button
                        onClick={() =>
                          saveUserAction("accepted", invitation._id)
                        }
                        className="p-2 rounded-full bg-green-100 hover:bg-green-200 shadow cursor-pointer transform transition duration-200 hover:scale-110"
                        title="Accept"
                      >
                        <ThumbsUp className="w-4 h-4 text-green-500" />
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
