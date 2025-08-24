import useFeed from "../hooks/useFeed";
import UserCard from "./UserCard";
import Toast from "./Toast";
import Loader from "./Loader";
import UserCardShimmer from "../skeletons/UserCardShimmer";

const Feed = () => {
  const { feeds, handleUserAction, toastConfig, loading, showShimmer } =
    useFeed();

  return (
    <div className="my-4 relative w-full px-4">
      {loading && <Loader />}
      <Toast isVisble={toastConfig.isVisible} message={toastConfig.message} />
      <div className="divider text-xl font-bold my-6">Feed</div>
      <div className="flex justify-center my-4 relative">
        {showShimmer && <UserCardShimmer />}

        {!showShimmer && feeds.length > 0 && (
          <UserCard user={feeds[0]} onStatusClick={handleUserAction} />
        )}

        {!showShimmer && !feeds?.length && (
          <div className="card bg-base-200 shadow-sm w-full max-w-md">
            <div className="card-body items-center text-center">
              <span className="text-5xl mb-2">📭</span>
              <h2 className="card-title">No Feed History</h2>
              <p className="text-gray-500">
                You don’t have any feed history yet. Check back later!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
