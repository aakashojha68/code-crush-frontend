import { ThumbsDown, ThumbsUp } from "lucide-react";

const UserCard = ({ user, onStatusClick, hideBtn = false }) => {
  const { _id, photoUrl, firstName, lastName, gender, age, about } = user || {};

  return (
    user && (
      <div
        key={_id}
        className="card bg-base-200 w-full md:w-96 shadow-md rounded-2xl overflow-hidden"
      >
        <figure className="aspect-square w-full">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body p-4 space-y-2">
          <h2 className="card-title text-lg font-semibold text-white">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-300">
            {gender} • {age} yrs
          </p>
          <p className="text-sm text-white line-clamp-2">{about}</p>

          {!hideBtn && (
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={() => onStatusClick && onStatusClick("ignored", _id)}
                className="p-3 rounded-full bg-red-100 hover:bg-red-200 shadow-sm cursor-pointer transform transition-transform duration-200 hover:scale-110"
                title="Ignored"
              >
                <ThumbsDown className="w-6 h-6 text-red-500" />
              </button>

              <button
                onClick={() =>
                  onStatusClick && onStatusClick("interested", _id)
                }
                className="p-3 rounded-full bg-green-100 hover:bg-green-200 shadow-sm cursor-pointer transform transition-transform duration-200 hover:scale-110"
                title="Interested"
              >
                <ThumbsUp className="w-6 h-6 text-green-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default UserCard;
