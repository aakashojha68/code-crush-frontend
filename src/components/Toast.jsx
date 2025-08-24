const Toast = ({ isVisble, message, className = "success" }) => {
  return (
    isVisble && (
      <div className="toast toast-end toast-top absolute z-10">
        <div className={`alert alert-${className}`}>
          <span>{message}</span>
        </div>
      </div>
    )
  );
};

export default Toast;
