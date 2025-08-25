const ConnectedUserSkeleton = () => {
  return (
    <div className="card card-side shadow-sm p-2 w-full max-w-lg mx-auto bg-base-200">
      <div className="card-body p-1 sm:flex-row gap-5 items-start">
        <div className="avatar">
          <div className="skeleton w-10 h-10 rounded-full"></div>
        </div>

        <div className="flex-1">
          <div className="skeleton h-5 w-32 mb-2"></div>
          <div className="skeleton h-4 w-full mb-1"></div>
          <div className="skeleton h-4 w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUserSkeleton;
