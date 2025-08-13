const UserCard = ({ user, onStatusClick, hideBtn = false }) => {
  const { _id, photoUrl, firstName, lastName, gender, age, about } = user || {};

  return (
    user && (
      <div key={_id} className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            {gender} | {age}
          </p>
          <p>{about}</p>
          {!hideBtn && (
            <div className="justify-center card-actions mt-5">
              <button
                className="btn btn-primary"
                onClick={() => onStatusClick && onStatusClick("ignored", _id)}
              >
                Ignored
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  onStatusClick && onStatusClick("interested", _id)
                }
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default UserCard;
