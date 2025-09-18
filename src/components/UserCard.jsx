import React from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {}
  };
  return (
    <div>
      <div className="card bg-base-300 w-80 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={photoUrl} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <h2 className="card-title">
            {age},{gender}
          </h2>
          <p>{about}</p>
          <div className="card-actions">
            <button
              className="btn btn- bg-accent"
              onClick={() => handleSendRequest("interested", _id)}>
              Interested
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("ignored", _id)}>
              Ignored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
