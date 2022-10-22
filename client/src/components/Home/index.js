import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import Auth from "../../utils/auth";
import "./index.css";
const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || {};
  console.log(users);
  if (loading) {
    return <div>Loading</div>;
  }
  // console.log(user.username);
  return (
    <div className="flex-row homepage">
      <div className="map">
        {users.map((user, index) => (
          <div className="player-position" key={user._id + index.toString()}>
            <button>
              <img
                className="player"
                src={require(`../../images/${user.profile_pic}`)}
              ></img>
              <p>{user.username}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
