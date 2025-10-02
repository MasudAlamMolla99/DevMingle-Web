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
      <div className="card bg-base-300 w-80 border border-black hover:shadow-bottomRight transition-all duration-300">
        <figure className="w-fit  h-96">
          <img src={photoUrl} alt="Shoes" className="" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-4xl">{firstName + " " + lastName}</h2>
          <h2 className="card-title text-xl">{age + ", " + gender}</h2>
          <p>{about}</p>
          <div className="card-actions">
            <button
              className="btn bg-accent hover:shadow-[4px_4px_6px_rgba(0,0,0,0.4)] transition-all duration-300"
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
