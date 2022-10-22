import React from "react";
import "./index.css";
function User(item) {
  const { _id, statusText, username } = item;

  return (
    <div>
      <h4 className="status">{username}'s Status:</h4>
      <p className="statusText">{statusText}</p>
    </div>
  );
}

export default User;
