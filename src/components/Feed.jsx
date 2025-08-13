import useFeed from "../hooks/useFeed";
import UserCard from "./UserCard";
import Toast from "./Toast";

const Feed = () => {
  const { feeds, handleUserAction, toastConfig } = useFeed();

  if (!feeds) return;

  return (
    <>
      <div className="flex justify-center my-4 relative">
        <Toast isVisble={toastConfig.isVisible} message={toastConfig.message} />
        {feeds.length > 0 ? (
          <UserCard user={feeds[0]} onStatusClick={handleUserAction} />
        ) : (
          <h3>No feed history found !!</h3>
        )}
      </div>
    </>
  );
};

export default Feed;
