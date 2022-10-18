import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(GET_USER);
  const user = data?.me || {};
  return (
    <div className="container">
      Profile Page
      <p>Info we will need:</p>
      <ul>
        <li>Users pets</li>
        <li>user comments (from status comments)</li>
        <li>pets information (users pets)</li>
      </ul>
    </div>
  );
};

export default Profile;
