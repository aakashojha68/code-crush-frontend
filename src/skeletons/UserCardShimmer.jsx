const UserCardShimmer = () => {
  return (
    <div className="card bg-base-200 w-96 shadow-sm animate-pulse">
      <figure className="bg-base-300 h-72 w-full"></figure>

      <div className="card-body">
        <div className="h-5 bg-base-300 rounded w-1/2"></div>

        <div className="h-4 bg-base-300 rounded w-1/4 mt-2"></div>

        <div className="h-3 bg-base-300 rounded w-full mt-4"></div>
        <div className="h-3 bg-base-300 rounded w-5/6 mt-2"></div>

        <div className="flex gap-3 mt-5 justify-center">
          <div className="h-10 bg-base-300 rounded w-24"></div>
          <div className="h-10 bg-base-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default UserCardShimmer;
