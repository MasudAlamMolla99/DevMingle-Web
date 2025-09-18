import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  console.log(connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);

      dispatch(addConnection(res.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="text-2xl text-center mt-2.5">No connection found</h1>;

  return (
    <div className="flex flex-col items-center my-6">
      <h1 className="font-bold text-2xl mb-4">Connections</h1>

      <div className="w-full max-w-2xl space-y-4">
        {connections.map((connection, idx) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;

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

              {/* Right side: Info */}
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {age} years old • {gender}
                </p>
                <p className="mt-2 text-gray-700">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
