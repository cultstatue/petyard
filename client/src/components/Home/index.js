import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";
import "./index.css";
import Auth from "../../utils/auth";
const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || {};
  console.log(users);
  // console.log(user.username);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="flex-row homepage">
      {" "}
      <div className="status-section">
        <h1>What's your status?</h1>
        <form className="comment-form">
          <textarea
            placeholder="Say something nice..."
            className="form-input "
          ></textarea>

          <button className="sub-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="map">
        {users.map((user, index) => (
          <div className="player-position" key={user._id + index.toString()}>
            <button>
              <p className="user-tag">{user.username}</p>
              <img className="player" src={`/images/${user.profile_img}`}></img>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
