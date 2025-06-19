import React from "react";

const UserCard = ({user}) => {
    const {firstName,lastName,age,gender,skills,photoURL,about} = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoURL}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {about && <p>{about}</p>}
        {age && gender &&<p>{age + " " + gender}
        </p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
