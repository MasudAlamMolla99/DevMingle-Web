import React, { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  // Review request (accept/reject)
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true } // include cookies/session
      );

      // Refresh requests after action
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/review/received`, {
        withCredentials: true,
      });

      dispatch(addRequest(res.data?.data || []));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return <h1 className="text-2xl text-center mt-2.5">No requests found</h1>;

  return (
    <div className="flex flex-col items-center my-6">
      <h1 className="font-bold text-2xl mb-4">Requests</h1>
      <div className="w-full max-w-2xl space-y-4">
        {requests.map((request, idx) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={idx}
              className="flex items-start bg-white shadow rounded-lg p-4 gap-4">
              {/* Left side: Image */}
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-20 h-20 rounded-full object-cover border"
              />

              {/* Right side: Info + Buttons */}
              <div className="flex flex-col flex-1">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {age} years old • {gender}
                </p>
                <p className="mt-2 text-gray-700">{about}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("rejected", request._id)}>
                    Reject
                  </button>
                  <button
                    className="btn btn-accent"
                    onClick={() => reviewRequest("accepted", request._id)}>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
