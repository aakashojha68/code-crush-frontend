const ConnectionCardSkeleton = () => {
  return (
    <div className="card card-side bg-base-200 shadow-sm mt-4">
      <div className="card-body sm:flex-row gap-10 sm:items-center">
        {/* Avatar skeleton */}
        <div className="avatar">
          <div className="skeleton w-24 h-24 rounded-full"></div>
        </div>

        {/* Text skeleton */}
        <div className="flex-1">
          <div className="skeleton h-6 w-40 mb-2"></div> {/* Name */}
          <div className="skeleton h-4 w-full mb-1"></div> {/* About line 1 */}
          <div className="skeleton h-4 w-5/6"></div> {/* About line 2 */}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCardSkeleton;
