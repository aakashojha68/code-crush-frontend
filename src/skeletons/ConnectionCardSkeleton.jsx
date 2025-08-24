const ConnectionCardSkeleton = () => {
  return (
    <div className="card card-side bg-base-200 shadow-sm mt-4 p-0">
      <div className="card-body p-1 sm:flex-row gap-5 sm:items-center">
        {/* Avatar skeleton */}
        <div className="avatar">
          <div className="skeleton w-10 h-10 rounded-full"></div>
        </div>

        {/* Text skeleton */}
        <div className="flex-1">
          <div className="skeleton h-6 w-40 mb-2"></div>
          <div className="skeleton h-4 w-full mb-1"></div>
          <div className="skeleton h-4 w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCardSkeleton;
