const Loader = () => {
  return (
    <div className="h-screen w-screen bg-[#00000085] fixed top-0 left-0 z-10">
      <div className="h-full w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
};

export default Loader;
