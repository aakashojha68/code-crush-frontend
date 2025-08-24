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
      <div className="divider text-xl font-bold my-6">Feed</div>
      <div className="flex justify-center my-4 relative">
        <Toast isVisble={toastConfig.isVisible} message={toastConfig.message} />

        {showShimmer && <UserCardShimmer />}

        {!showShimmer && feeds.length > 0 && (
          <UserCard user={feeds[0]} onStatusClick={handleUserAction} />
        )}

        {!showShimmer && !feeds?.length && <h3>No feed history found !!</h3>}
      </div>
    </div>
  );
};

export default Feed;
