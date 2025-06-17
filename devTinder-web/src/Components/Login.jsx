import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("ashu@gmail.com");
  const [password, setPassword] = useState("Ashu@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-300  shadow-xl ">
        <div className="card-body my-2">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="justify-center card-actions">
            <button onClick={handleSubmit} className="btn btn-primary">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
