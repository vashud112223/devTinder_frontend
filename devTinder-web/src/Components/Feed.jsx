import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/users/feed", {
        withCredentials: true,
      });
      // console.log(res?.data?.data)
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
    if (!feed) return;
  if (feed.length <= 0) return <h1 className="flex justify-center my-10">No new User Found</h1>;
  
  return feed && <div className="flex justify-center my-10">
    <UserCard user = {feed[0]}/>
  </div>;
};

export default Feed;
