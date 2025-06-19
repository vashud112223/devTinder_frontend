import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addrequest, removerequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  console.log(requests);
  const dispatch = useDispatch();

  const reviewrequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removerequest(_id))
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/users/request/received", {
        withCredentials: true,
      });
      // console.log(res.data?.data);
      dispatch(addrequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  });
  if (!requests) return;
  if (requests.length === 0) return <h1>No request Found</h1>;
  return (
    <>
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">Requests Received</h1>
      </div>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, about, photoURL } =
          request.fromUserID;

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
            <div className="flex justify-center">
              <button
                className="btn btn-primary"
                onClick={() => reviewrequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-4 mb-2"
                onClick={() => reviewrequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Requests;
