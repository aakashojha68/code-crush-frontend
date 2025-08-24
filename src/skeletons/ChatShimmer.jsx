const ChatShimmer = ({ count = 5 }) => {
  return (
    <>
      {Array(count)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className={`chat ${i % 2 === 0 ? "chat-start" : "chat-end"} `}
          >
            {/* Header shimmer */}
            <div className="chat-header">
              <div className="skeleton h-4 w-24 rounded mb-1 bg-base-200"></div>
              <div className="skeleton h-3 w-12 rounded opacity-50 ml-2"></div>
            </div>

            {/* Bubble shimmer */}
            <div className="chat-bubble px-2 py-1 md:px-4 md:py-2 md:text-base">
              <div className="skeleton h-4 w-32 rounded mb-1"></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ChatShimmer;
