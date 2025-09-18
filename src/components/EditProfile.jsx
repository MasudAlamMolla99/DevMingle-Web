import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || " ");
  const [lastName, setLastName] = useState(user.lastName || " ");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || " ");
  const [age, setAge] = useState(user.age || " ");
  const [gender, setGender] = useState(user.gender || " ");
  const [about, setAbout] = useState(user.about || " ");
  const [error, setError] = useState();
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setToastMessage("Profile Updated Successfully");
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="flex items-center my-10 ">
      <div className="flex justify-center mt-10 mx-10">
        <div className="card bg-neutral-content w-80 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">Edit Profile</h2>

            <fieldset className="fieldset">
              <h2 className="text-sm font-medium">First Name</h2>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <h2 className="text-sm font-medium">Last Name</h2>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <h2 className="text-sm font-medium">Photo URL</h2>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <h2 className="text-sm font-medium">Age</h2>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <h2 className="text-sm font-medium">Gender</h2>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <h2 className="text-sm font-medium">About</h2>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input"
              />
            </fieldset>
            {error && <p className="text-red-500">{error}</p>}

            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
