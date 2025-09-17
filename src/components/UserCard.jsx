import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
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
            <button className="btn btn- bg-accent">Interested</button>
            <button className="btn btn-secondary">Ignored</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
