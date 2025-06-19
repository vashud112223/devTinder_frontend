import React from "react";
import Editprofile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user && (
    <div>
      <Editprofile user={user} />
    </div>
  );
};

export default Profile;
