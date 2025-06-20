import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoURL, about } = user;
  const dispatch = useDispatch();

  const handleUsers = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/sendConnectionRequest/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {about && <p>{about}</p>}
        {age && gender && <p>{age + " " + gender}</p>}
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleUsers("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleUsers("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
