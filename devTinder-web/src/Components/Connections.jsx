import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addconnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  console.log(connections);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/users/connections", {
        withCredentials: true,
      });
      // console.log(res.data?.data);
      dispatch(addconnection(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  });
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connection Found</h1>;
  return (
    <>
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">Connections</h1>
      </div>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoURL } =
          connection;

        return (
          <div key={_id} className="card bg-base-300 w-96 shadow-sm mx-4">
            <figure>
              <img src={photoURL} alt="photo" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {about && <p>{about}</p>}
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Connections;
