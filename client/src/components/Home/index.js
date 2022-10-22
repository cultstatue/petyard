import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS, QUERY_STATUS } from "../../utils/queries";
import User from "../User";
import "./index.css";
import Auth from "../../utils/auth";
const Home = () => {
  // toggleStatus
  const [currentUser, setCurrentUser] = useState("");
  console.log(currentUser);
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || {};

  // const { loading: statusLoading, data: statusData } = useQuery(QUERY_STATUS, {
  //   variables: { username: currentUser },
  // });

  function filterUser() {
    // console.log("in filterUser");
    if (!currentUser) {
      return users.status;
    }
    const foundUser = users.filter((user) => user.username === currentUser);
    // console.log(foundUser);

    return foundUser;
  }

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
            <button
              onClick={() => {
                setCurrentUser(user.username);
              }}
            >
              <p className="user-tag">{user.username}</p>
              <img className="player" src={`/images/${user.profile_img}`}></img>
            </button>
          </div>
        ))}
      </div>
      <div className="dialogue">
        {currentUser ? (
          <>
            {filterUser().map((user) => (
              <>
                <User
                  key={user._id}
                  _id={user._id}
                  statusText={user.status.statusText}
                  username={user.username}
                />
              </>
            ))}
          </>
        ) : (
          <>
            <p>Choose a user to see how they feel!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
