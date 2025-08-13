const Toast = ({ isVisble, message }) => {
  return (
    isVisble && (
      <div className="toast toast-end toast-top absolute z-10">
        <div className="alert alert-info">
          <span>{message}</span>
        </div>
      </div>
    )
  );
};

export default Toast;
