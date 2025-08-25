const ConnectionCardSkeleton = () => {
  return (
    <div className="card card-side bg-base-200 shadow-sm mt-4 w-full max-w-lg mx-auto">
      <div className="card-body sm:flex-row gap-4 md:gap-5 w-full items-start">
        {/* Avatar skeleton */}
        <div className="avatar">
          <div className="skeleton w-10 md:w-14 h-10 md:h-14 rounded-full"></div>
        </div>

        {/* Text skeleton */}
        <div className="flex-1">
          <div className="skeleton h-5 w-32 mb-2"></div> {/* Name */}
          <div className="skeleton h-4 w-full mb-1"></div> {/* About line 1 */}
          <div className="skeleton h-4 w-5/6"></div> {/* About line 2 */}
        </div>

        {/* Action buttons skeleton */}
        <div className="flex justify-center gap-4 md:mt-2">
          <div className="skeleton w-8 h-8 rounded-full"></div>
          <div className="skeleton w-8 h-8 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCardSkeleton;
